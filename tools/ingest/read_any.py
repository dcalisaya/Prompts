#!/usr/bin/env python3
"""
Lector unificado de archivos operativos para agentes del workspace.

Soporta:
- csv
- xlsx
- docx
- txt
- md
- json
- pdf (opcional con pypdf)
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET
from zipfile import ZipFile


NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def read_text_file(path: Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    return {
        "source": str(path),
        "type": path.suffix.lstrip(".").lower(),
        "title": path.stem,
        "text": text,
        "metadata": {
            "line_count": len(text.splitlines()),
            "char_count": len(text),
        },
    }


def read_json_file(path: Path) -> dict[str, Any]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    text = json.dumps(payload, ensure_ascii=False, indent=2)
    return {
        "source": str(path),
        "type": "json",
        "title": path.stem,
        "text": text,
        "data": payload,
        "metadata": {
            "top_level_type": type(payload).__name__,
        },
    }


def read_csv_file(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    columns = list(rows[0].keys()) if rows else []
    preview_lines = []
    if columns:
        preview_lines.append(", ".join(columns))
    for row in rows[:10]:
        preview_lines.append(", ".join(str(row.get(col, "")) for col in columns))

    return {
        "source": str(path),
        "type": "csv",
        "title": path.stem,
        "text": "\n".join(preview_lines).strip(),
        "columns": columns,
        "rows": rows,
        "metadata": {
            "row_count": len(rows),
            "column_count": len(columns),
        },
    }


def _shared_strings(zip_file: ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in zip_file.namelist():
        return []
    root = ET.fromstring(zip_file.read("xl/sharedStrings.xml"))
    strings: list[str] = []
    for si in root.findall("a:si", NS):
        text_parts = [node.text or "" for node in si.findall(".//a:t", NS)]
        strings.append("".join(text_parts))
    return strings


def _xlsx_cell_value(cell: ET.Element, strings: list[str]) -> Any:
    cell_type = cell.attrib.get("t")
    value_node = cell.find("a:v", NS)
    if value_node is None or value_node.text is None:
        return ""
    raw = value_node.text
    if cell_type == "s":
        try:
            return strings[int(raw)]
        except (ValueError, IndexError):
            return raw
    if cell_type == "b":
        return raw == "1"
    if raw.isdigit():
        return int(raw)
    try:
        return float(raw)
    except ValueError:
        return raw


def _xlsx_col_to_index(ref: str) -> int:
    match = re.match(r"([A-Z]+)", ref)
    if not match:
        return 0
    result = 0
    for char in match.group(1):
        result = result * 26 + (ord(char) - ord("A") + 1)
    return result - 1


def read_xlsx_file(path: Path) -> dict[str, Any]:
    with ZipFile(path) as zip_file:
        strings = _shared_strings(zip_file)
        workbook = ET.fromstring(zip_file.read("xl/workbook.xml"))
        workbook_rels = ET.fromstring(zip_file.read("xl/_rels/workbook.xml.rels"))

        rel_map = {
            rel.attrib["Id"]: rel.attrib["Target"]
            for rel in workbook_rels
            if rel.attrib.get("Target")
        }

        sheets: list[dict[str, Any]] = []
        for sheet in workbook.findall("a:sheets/a:sheet", NS):
            name = sheet.attrib.get("name", "Sheet")
            rel_id = sheet.attrib.get("{%s}id" % NS["r"])
            target = rel_map.get(rel_id, "")
            sheet_path = f"xl/{target}" if not target.startswith("xl/") else target
            xml_root = ET.fromstring(zip_file.read(sheet_path))

            rows: list[list[Any]] = []
            for row in xml_root.findall(".//a:sheetData/a:row", NS):
                cells = row.findall("a:c", NS)
                if not cells:
                    continue
                max_index = max(_xlsx_col_to_index(cell.attrib.get("r", "A1")) for cell in cells)
                row_values = [""] * (max_index + 1)
                for cell in cells:
                    index = _xlsx_col_to_index(cell.attrib.get("r", "A1"))
                    row_values[index] = _xlsx_cell_value(cell, strings)
                rows.append(row_values)

            sheets.append(
                {
                    "name": name,
                    "rows": rows,
                    "row_count": len(rows),
                    "column_count": max((len(row) for row in rows), default=0),
                }
            )

    preview_lines = []
    for sheet in sheets[:3]:
        preview_lines.append(f"[{sheet['name']}]")
        for row in sheet["rows"][:10]:
            preview_lines.append(", ".join(str(value) for value in row))

    return {
        "source": str(path),
        "type": "xlsx",
        "title": path.stem,
        "text": "\n".join(preview_lines).strip(),
        "sheets": sheets,
        "metadata": {
            "sheet_count": len(sheets),
        },
    }


def read_docx_file(path: Path) -> dict[str, Any]:
    with ZipFile(path) as zip_file:
        root = ET.fromstring(zip_file.read("word/document.xml"))

    paragraphs = []
    tables = []

    for paragraph in root.findall(".//w:p", NS):
        texts = [node.text or "" for node in paragraph.findall(".//w:t", NS)]
        line = "".join(texts).strip()
        if line:
            paragraphs.append(line)

    for table in root.findall(".//w:tbl", NS):
        table_rows = []
        for row in table.findall(".//w:tr", NS):
            cells = []
            for cell in row.findall(".//w:tc", NS):
                texts = [node.text or "" for node in cell.findall(".//w:t", NS)]
                cells.append("".join(texts).strip())
            if any(cells):
                table_rows.append(cells)
        if table_rows:
            tables.append(table_rows)

    text_parts = list(paragraphs)
    for idx, table in enumerate(tables[:3], start=1):
        text_parts.append(f"[Tabla {idx}]")
        text_parts.extend(" | ".join(cell for cell in row if cell) for row in table[:10])

    return {
        "source": str(path),
        "type": "docx",
        "title": path.stem,
        "text": "\n".join(text_parts).strip(),
        "paragraphs": paragraphs,
        "tables": tables,
        "metadata": {
            "paragraph_count": len(paragraphs),
            "table_count": len(tables),
        },
    }


def read_pdf_file(path: Path) -> dict[str, Any]:
    try:
        from pypdf import PdfReader
    except ImportError as exc:
        raise RuntimeError(
            "La lectura de PDF requiere 'pypdf'. Instala con: python3 -m pip install pypdf"
        ) from exc

    reader = PdfReader(str(path))
    pages = []
    for index, page in enumerate(reader.pages, start=1):
        text = (page.extract_text() or "").strip()
        pages.append({"page": index, "text": text})

    joined = "\n\n".join(
        f"[Página {page['page']}]\n{page['text']}" for page in pages if page["text"]
    )

    return {
        "source": str(path),
        "type": "pdf",
        "title": path.stem,
        "text": joined.strip(),
        "pages": pages,
        "metadata": {
            "page_count": len(reader.pages),
        },
    }


READERS = {
    ".txt": read_text_file,
    ".md": read_text_file,
    ".json": read_json_file,
    ".csv": read_csv_file,
    ".xlsx": read_xlsx_file,
    ".docx": read_docx_file,
    ".pdf": read_pdf_file,
}


def parse_file(path: Path) -> dict[str, Any]:
    reader = READERS.get(path.suffix.lower())
    if reader is None:
        supported = ", ".join(sorted(ext.lstrip(".") for ext in READERS))
        raise RuntimeError(f"Formato no soportado: {path.suffix or '(sin extensión)'}; soportados: {supported}")
    return reader(path)


def render_text(payload: dict[str, Any]) -> str:
    lines = [
        f"source: {payload['source']}",
        f"type: {payload['type']}",
        f"title: {payload.get('title', '')}",
    ]

    metadata = payload.get("metadata") or {}
    if metadata:
        lines.append("metadata:")
        for key, value in metadata.items():
            lines.append(f"  - {key}: {value}")

    text = payload.get("text", "").strip()
    if text:
        lines.extend(["", "content:", text])

    return "\n".join(lines).strip() + "\n"


def write_derived(path: Path, payload: dict[str, Any], as_json: bool) -> Path:
    derived_dir = path.parent / "derived"
    derived_dir.mkdir(parents=True, exist_ok=True)
    suffix = ".json" if as_json else ".md"
    target = derived_dir / f"{path.stem}{suffix}"
    if as_json:
        target.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    else:
        target.write_text(render_text(payload), encoding="utf-8")
    return target


def main() -> int:
    parser = argparse.ArgumentParser(description="Lee archivos operativos para agentes del workspace.")
    parser.add_argument("path", help="Ruta del archivo a leer")
    parser.add_argument("--json", action="store_true", dest="as_json", help="Devuelve salida JSON")
    parser.add_argument(
        "--write-derived",
        action="store_true",
        help="Guarda un derivado en una carpeta derived junto al archivo original",
    )
    args = parser.parse_args()

    path = Path(args.path).expanduser().resolve()
    if not path.exists():
        print(f"Archivo no encontrado: {path}", file=sys.stderr)
        return 1
    if not path.is_file():
        print(f"La ruta no es un archivo: {path}", file=sys.stderr)
        return 1

    try:
        payload = parse_file(path)
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        return 2

    if args.write_derived:
        target = write_derived(path, payload, args.as_json)
        print(f"Derivado escrito en: {target}", file=sys.stderr)

    if args.as_json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(render_text(payload), end="")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
