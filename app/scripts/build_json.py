#!/usr/bin/env python3
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
BASE_JSON = ROOT / "base" / "json"
MASTERS = ROOT / "base" / "masters"
PROMPTS_DIR = MASTERS / "prompts-operativos"
AGENTS_DIR = MASTERS / "agents"
CANONICAL_NAV = MASTERS / "company" / "18-NAVEGACION-CANONICA.json"
MANUAL_DIRS = [
    MASTERS / "manuales-desarrollo",
    MASTERS / "manuales-produccion",
]
MANUALS_NEW_ROOT = MASTERS / "manuales"
VALID_PROMPT_CATEGORIES = {
    "Producción Audiovisual",
    "Marketing Digital y Contenidos",
    "Gestión Comercial",
    "Desarrollo de Software y Apps",
    "Relaciones Públicas y Comunicación",
    "Data, Analytics e Insights",
    "Media Planning y Performance",
    "Consultoria de Negocio",
    "Commerce Avanzado",
    "Customer Experience y CRM",
    "Content Strategy y Copy",
    "Influencer Marketing",
    "Experiential y Eventos",
    "Healthcare Marketing",
    "Sostenibilidad y ESG",
}


def write_json(name, data):
    BASE_JSON.mkdir(parents=True, exist_ok=True)
    path = BASE_JSON / name
    path.write_text(
        json.dumps(data, indent=2, ensure_ascii=True) + "\n", encoding="utf-8"
    )


def write_text(name, data):
    BASE_JSON.mkdir(parents=True, exist_ok=True)
    path = BASE_JSON / name
    path.write_text(data.rstrip() + "\n", encoding="utf-8")


def load_canonical_navigation():
    return json.loads(CANONICAL_NAV.read_text(encoding="utf-8"))


def prompt_prefix(prompt_id: str) -> str:
    return prompt_id.split("-", 1)[0] if prompt_id else ""


def extract_section(text, heading):
    pattern = rf"{re.escape(heading)}\n(.*?)(?=\n## |\n### |\Z)"
    m = re.search(pattern, text, re.S)
    if not m:
        return ""
    return m.group(1).replace("\n---", "").strip()


def parse_bullets(block):
    items = []
    for line in block.splitlines():
        line = line.strip()
        if line.startswith("- "):
            items.append(line[2:].strip())
        elif re.match(r"^\d+\.\s", line):
            items.append(re.sub(r"^\d+\.\s*", "", line).strip())
    return items


def parse_front_matter(text):
    if not text.startswith("---\n"):
        return {}
    end = text.find("\n---", 4)
    if end == -1:
        return {}
    raw = text[4:end].strip().splitlines()
    data = {}
    current_key = None
    for line in raw:
        if line.startswith("  - ") and current_key:
            data.setdefault(current_key, []).append(line[4:].strip())
            continue
        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            current_key = key
            if value:
                if value.startswith("[") and value.endswith("]"):
                    items = [
                        item.strip().strip("'\"")
                        for item in value[1:-1].split(",")
                        if item.strip()
                    ]
                    data[key] = items
                else:
                    data[key] = value.strip('"')
            else:
                data[key] = []
    return data


def strip_front_matter(text):
    if not text.startswith("---\n"):
        return text
    end = text.find("\n---", 4)
    if end == -1:
        return text
    return text[end + 4 :].lstrip()


def parse_markdown_table(text):
    lines = [line.rstrip() for line in text.splitlines() if line.strip()]
    table_lines = [line for line in lines if line.startswith("|")]
    if len(table_lines) < 3:
        return []
    headers = [cell.strip().strip("`") for cell in table_lines[0].strip("|").split("|")]
    rows = []
    for line in table_lines[2:]:
        cells = [cell.strip().strip("`") for cell in line.strip("|").split("|")]
        if len(cells) != len(headers):
            continue
        rows.append(dict(zip(headers, cells)))
    return rows


def parse_table_after_heading(text, heading):
    lines = text.splitlines()
    start = None
    for idx, line in enumerate(lines):
        if line.strip() == heading:
            start = idx + 1
            break
    if start is None:
        return []
    chunk = []
    for line in lines[start:]:
        if line.startswith("## ") and chunk:
            break
        if line.startswith("|"):
            chunk.append(line)
        elif chunk and line.strip() == "":
            continue
        elif chunk:
            break
    return parse_markdown_table("\n".join(chunk))


def metadata_path_exists(ref: str) -> bool:
    candidates = [ROOT / ref, MASTERS / ref]
    return any(path.exists() for path in candidates)


def validate_manual_front_matter():
    errors = []
    required_fields = {"id", "name", "category", "discipline", "type"}
    for manual_dir in MANUAL_DIRS:
        for path in sorted(manual_dir.glob("*.md")):
            fm = parse_front_matter(path.read_text(encoding="utf-8"))
            missing = sorted(required_fields - set(fm))
            if missing:
                errors.append(
                    f"{path.relative_to(ROOT)}: faltan campos en front matter: {', '.join(missing)}"
                )
    if MANUALS_NEW_ROOT.exists():
        for path in sorted(MANUALS_NEW_ROOT.rglob("*.md")):
            if path.name == "INDEX.md":
                continue
            fm = parse_front_matter(path.read_text(encoding="utf-8"))
            missing = sorted(required_fields - set(fm))
            if missing:
                errors.append(
                    f"{path.relative_to(ROOT)}: faltan campos en front matter: {', '.join(missing)}"
                )
    return errors


def parse_manuals_from_new_structure():
    if not MANUALS_NEW_ROOT.exists():
        return [], []
    manuals = []
    disciplines = []
    for disc_path in sorted(MANUALS_NEW_ROOT.iterdir()):
        if not disc_path.is_dir():
            continue
        discipline_slug = disc_path.name
        discipline_name = discipline_slug.replace("-", " ").title()
        manual_count = 0
        for path in sorted(disc_path.glob("*.md")):
            if path.name == "INDEX.md" or path.name.startswith("ESTANDAR"):
                continue
            fm = parse_front_matter(path.read_text(encoding="utf-8"))
            body = strip_front_matter(path.read_text(encoding="utf-8"))
            title_match = re.search(r"^#\s+(.+)$", body, re.M)
            if fm.get("discipline"):
                discipline_name = fm.get("discipline")
            manual = {
                "id": fm.get("id", ""),
                "name": fm.get(
                    "name", title_match.group(1) if title_match else path.stem
                ),
                "category": fm.get("category", ""),
                "discipline": fm.get("discipline", ""),
                "discipline_slug": discipline_slug,
                "type": fm.get("type", ""),
                "version": fm.get("version", "1.0.0"),
                "path": str(path.relative_to(ROOT)),
                "legacy_path": fm.get("migrated_from", ""),
                "legacy_id": fm.get("legacy_id", ""),
                "related_services": fm.get("related_services", []),
                "related_agents": fm.get("related_agents", []),
                "related_prompts": fm.get("related_prompts", []),
                "source_of_truth": fm.get("source_of_truth", False),
                "migrated": bool(fm.get("migrated_from", "")),
                "tags": fm.get("tags", []),
                "scope_base": extract_section(body, "## Resumen") or "",
                "not_included": "",
            }
            if manual["id"]:
                manuals.append(manual)
                manual_count += 1
        disciplines.append(
            {
                "slug": discipline_slug,
                "name": discipline_name,
                "manual_count": manual_count,
                "complete": manual_count > 0,
            }
        )
    return manuals, disciplines


def parse_services():
    text = (MASTERS / "catalog" / "08-SERVICES.md").read_text(encoding="utf-8")
    services = []
    category = None
    category_matches = list(re.finditer(r"^##\s+(.+)$", text, re.M))
    matches = list(re.finditer(r"^###\s+`([A-Z]+-\d+)`\s+-\s+(.+)$", text, re.M))

    for idx, match in enumerate(matches):
        section_start = match.end()
        section_end = matches[idx + 1].start() if idx + 1 < len(matches) else len(text)
        section = text[section_start:section_end].strip()

        for heading in category_matches:
            if heading.start() < match.start():
                category = heading.group(1).strip()
            else:
                break

        summary = re.search(r"\*\*Resumen:\*\*\s*(.+)", section)
        audience = re.search(r"\*\*Para quién es:\*\*\s*(.+)", section)
        includes = re.search(r"\*\*Qué incluye \(Alcance Base\):\*\*\s*(.+)", section)
        exclusions = re.search(r"\*\*Exclusiones / Límites:\*\*\s*(.+)", section)
        value = re.search(r"\*\*Valor / Casos de Uso:\*\*\s*(.+)", section)

        services.append(
            {
                "service_code": match.group(1).strip(),
                "service_name": match.group(2).strip(),
                "category": category,
                "description": summary.group(1).strip() if summary else "",
                "summary": summary.group(1).strip() if summary else "",
                "for_who": audience.group(1).strip() if audience else "",
                "scope_base_catalog": includes.group(1).strip() if includes else "",
                "not_included_catalog": exclusions.group(1).strip()
                if exclusions
                else "",
                "value_cases": value.group(1).strip() if value else "",
            }
        )
    return services


def parse_service_matrix():
    text = (MASTERS / "company" / "09-SERVICE-MATRIX.md").read_text(encoding="utf-8")
    rows = parse_table_after_heading(text, "## Matriz de servicios")
    result = []
    for row in rows:
        result.append(
            {
                "service_code": row["service_code"],
                "service_name": row["service_name"],
                "category": row["category"],
                "unit": row["unit"],
                "scope_base": row["scope_base"],
                "not_included": row["not_included"],
                "inputs": [item.strip() for item in row["inputs"].split(",")],
                "owner_area": row["owner_area"],
            }
        )
    return result


def parse_pricing():
    text = (MASTERS / "company" / "10-PRICING-INTERNO.md").read_text(encoding="utf-8")
    rows = parse_table_after_heading(text, "## Plantilla base para completar")
    result = []
    valid_prefixes = (
        "AV-",
        "MK-",
        "BR-",
        "INF-",
        "DEV-",
        "IA-",
        "PR-",
        "DAT-",
        "MED-",
        "BIZ-",
        "ECO-",
        "CX-",
        "CNT-",
        "IMK-",
        "EXP-",
        "HLT-",
        "ESG-",
    )
    valid = [
        row for row in rows if row.get("service_code", "").startswith(valid_prefixes)
    ]
    for row in valid:
        result.append(row)
    return result


def parse_prompts(canonical_navigation):
    result = []
    prefix_defaults = canonical_navigation.get("prompt_prefix_defaults", {})
    for path in sorted(PROMPTS_DIR.rglob("*.md")):
        if path.name == "INDEX.md":
            continue
        text = path.read_text(encoding="utf-8")
        fm = parse_front_matter(text)
        body = strip_front_matter(text)

        # Extracción de contenido textual
        title_match = re.search(r"^#\s+(.+)$", body, re.M)
        objetivo = re.search(r"\*\*Objetivo:\*\*\s*(.+)", body)
        descripcion = re.search(r"\*\*Descripcion:\*\*\s*(.+)", body)
        context = extract_section(body, "## Contexto para el Usuario")
        when_use = extract_section(body, "## Cuando usar este prompt")
        input_match = re.search(r"\*\*Input necesario:\*\*\s*(.+)", body)
        output_match = re.search(r"\*\*Output esperado:\*\*\s*(.+)", body)
        example = extract_section(body, "## Ejemplo de Uso")
        ex_input_match = re.search(r"\*\*Input ejemplo:\*\*\s*(.+)", example)
        example_output = parse_bullets(example)

        prompt_id = fm.get("id", "")
        defaults = prefix_defaults.get(prompt_prefix(prompt_id), {})

        # Consolidación de metadata con prioridad YAML > Defaults
        result.append(
            {
                "id": prompt_id,
                "name": fm.get(
                    "name", title_match.group(1) if title_match else path.stem
                ),
                "version": fm.get("version", "1.0.0"),
                "category": fm.get("category", defaults.get("category", "")),
                "discipline": fm.get("discipline", defaults.get("discipline", "")),
                "agent_core": fm.get("agent_core", ""),
                "source_of_truth": fm.get("source_of_truth", []),
                "related_services": fm.get(
                    "related_services", defaults.get("related_services", [])
                ),
                "stage": fm.get("stage", defaults.get("stage", "")),
                "input_type": fm.get("input_type", defaults.get("input_type", "")),
                "deliverable_type": fm.get(
                    "deliverable_type", defaults.get("deliverable_type", "")
                ),
                "tags": fm.get("tags", []),
                "objective": objetivo.group(1).strip()
                if objetivo
                else descripcion.group(1).strip()
                if descripcion
                else "",
                "when_to_use": when_use or context,
                "input_required": [input_match.group(1).strip()] if input_match else [],
                "expected_output": [output_match.group(1).strip()]
                if output_match
                else example_output,
                "example_input": ex_input_match.group(1).strip()
                if ex_input_match
                else "",
                "example_output": example_output,
                "path": str(path.relative_to(ROOT)),
            }
        )
    return result


def parse_agents(canonical_navigation):
    result = []
    metadata_map = canonical_navigation.get("agent_metadata", {})
    for path in sorted(AGENTS_DIR.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        fm = parse_front_matter(text)
        body = strip_front_matter(text)

        # Metadata del JSON (Legacy/Default)
        json_meta = metadata_map.get(path.stem, {})

        desc = re.search(r"\*\*Descripción:\*\*\s*(.+)", body)
        philosophy = extract_section(body, "## Tu Filosofía")
        skills = parse_bullets(extract_section(body, "## Tus Habilidades"))
        tasks = parse_bullets(extract_section(body, "## Tus Tareas Operativas"))
        tone = extract_section(body, "## Tono de Voz")
        start = extract_section(body, "## Comando de Inicio")
        example = extract_section(body, "## Ejemplo de Uso")
        ex_input_match = re.search(r"\*\*Input ejemplo:\*\*\s*(.+)", example)

        result.append(
            {
                "name": fm.get("name", path.stem),
                "role": fm.get(
                    "role",
                    re.sub(
                        r"^#\s+Prompt Maestro:\s*",
                        "",
                        body.splitlines()[0] if body.splitlines() else path.stem,
                    ).strip(),
                ),
                "discipline": fm.get("discipline", json_meta.get("discipline", "")),
                "related_services": fm.get(
                    "related_services", json_meta.get("related_services", [])
                ),
                "stage": fm.get("stage", json_meta.get("stage", "")),
                "deliverable_type": fm.get(
                    "deliverable_type", json_meta.get("deliverable_type", "")
                ),
                "description": desc.group(1).strip() if desc else "",
                "philosophy": philosophy,
                "skills": skills,
                "tasks": tasks,
                "tone": tone,
                "start_command": start,
                "example_input": ex_input_match.group(1).strip()
                if ex_input_match
                else "",
                "example_output": parse_bullets(example),
                "path": str(path.relative_to(ROOT)),
            }
        )
    return result


def build_static_json(canonical_navigation):
    quotation_rules = {
        "principles": [
            "se cotiza por servicios existentes",
            "el alcance debe escribirse en lenguaje claro",
            "cada linea de proforma debe tener unidad logica",
            "toda ambiguedad debe quedar marcada antes de emitir valor final",
            "la propuesta no debe vender algo que operacion no puede cumplir",
        ],
        "minimum_flow": [
            "recibir requerimiento",
            "clasificar por area",
            "mapear servicios con service_code",
            "detectar vacios",
            "definir alcance base y exclusiones",
            "validar pricing",
            "emitir proforma o propuesta",
        ],
        "minimum_proforma_structure": [
            "datos del cliente",
            "resumen del requerimiento",
            "servicios cotizados",
            "alcance base por servicio",
            "exclusiones o no incluidos",
            "supuestos del proyecto",
            "informacion faltante",
            "valor",
            "condiciones comerciales",
        ],
        "risk_semaphore": {
            "Verde": "requerimiento claro, servicio estandar, pricing definido",
            "Amarillo": "alcance parcialmente claro, faltan insumos o definiciones",
            "Rojo": "servicio no estandar, pricing no definido o alta incertidumbre",
        },
    }

    brief_templates = [
        {
            "brief_type": "comercial_general",
            "fields": [
                "nombre del cliente",
                "contacto responsable",
                "necesidad principal",
                "servicios solicitados",
                "fecha objetivo",
                "presupuesto referencial si existe",
                "canal de entrega esperado",
            ],
        },
        {
            "brief_type": "audiovisual",
            "fields": [
                "objetivo del video o pieza",
                "tipo de pieza",
                "cantidad de piezas",
                "duracion estimada",
                "formato requerido",
                "locacion",
                "fechas tentativas",
                "voceros o talento",
                "referencias visuales",
                "branding disponible",
            ],
        },
        {
            "brief_type": "podcast",
            "fields": [
                "nombre del podcast",
                "tematica",
                "publico objetivo",
                "cantidad de episodios",
                "duracion por episodio",
                "invitados o formato",
                "CTA principal",
                "plataformas destino",
            ],
        },
        {
            "brief_type": "marketing_funnel",
            "fields": [
                "producto o servicio",
                "propuesta de valor",
                "buyer persona",
                "nivel de consciencia",
                "objetivo de conversion",
                "ticket o valor de referencia",
                "activos existentes",
                "canales prioritarios",
            ],
        },
        {
            "brief_type": "pauta",
            "fields": [
                "objetivo de campana",
                "plataforma",
                "presupuesto de medios",
                "duracion",
                "audiencias",
                "geografia",
                "activos creativos disponibles",
                "pixel o tracking disponible",
                "conversion esperada",
            ],
        },
        {
            "brief_type": "branding_diseno",
            "fields": [
                "objetivo de la pieza",
                "formato",
                "mensajes clave",
                "branding existente",
                "referencias",
                "medidas o specs",
                "versionado requerido",
            ],
        },
        {
            "brief_type": "web_desarrollo",
            "fields": [
                "problema a resolver",
                "usuarios objetivo",
                "funcionalidades requeridas",
                "integraciones",
                "stack deseado si aplica",
                "accesos existentes",
                "dependencias externas",
                "criterio de exito",
            ],
        },
        {
            "brief_type": "ia_automatizacion",
            "fields": [
                "proceso actual",
                "tarea a automatizar",
                "entradas",
                "salidas",
                "herramientas involucradas",
                "frecuencia",
                "riesgo operativo",
                "validacion humana requerida",
            ],
        },
    ]

    workflow = {
        "stages": parse_markdown_table(
            (MASTERS / "company" / "13-FLUJO-COMERCIAL-Y-OPERATIVO.md").read_text(
                encoding="utf-8"
            )
        ),
        "recommended_flow": [
            "Comercial recibe necesidad",
            "Usa COM-001 para orientar servicio si el requerimiento esta verde",
            "Usa COM-002 para estructurar proforma si ya hay una necesidad concreta",
            "Valida servicios con 09-SERVICE-MATRIX.md",
            "Valida pricing con 10-PRICING-INTERNO.md",
            "Emite propuesta segun 11-REGLAS-DE-COTIZACION.md",
            "Una vez aprobado, Coordinacion arma kickoff",
            "Operacion trabaja con brief y prompt correspondiente",
            "Antes de entregar, pasa por calidad",
            "Se documenta cierre y siguiente oportunidad",
        ],
        "kickoff_checklist": [
            "brief aprobado",
            "alcance aprobado",
            "responsables definidos",
            "cronograma preliminar",
            "canal de comunicacion",
            "activos recibidos",
            "riesgos detectados",
            "criterio de entrega definido",
        ],
        "frequent_risks": [
            "venta sin brief completo",
            "mezcla de servicios en una sola linea",
            "ausencia de exclusiones",
            "tiempos comprometidos sin validacion",
            "cambios de alcance no documentados",
            "activos del cliente incompletos",
        ],
    }

    legal_commercial = {
        "base_clauses": [
            "vigencia de la propuesta",
            "forma de pago",
            "porcentaje de anticipo",
            "tiempos sujetos a aprobacion y entrega de insumos",
            "limite de revisiones incluidas",
            "manejo de cambios de alcance",
            "propiedad intelectual",
            "autorizaciones de uso",
            "suspension por falta de pagos o insumos",
            "exclusiones explicitas",
        ],
        "policies": {
            "pagos": [
                "definir si se trabaja con anticipo, hitos o pago completo",
                "no iniciar produccion sin validacion comercial minima",
                "entregas finales sujetas a pagos acordados",
            ],
            "revisiones": [
                "especificar cuantas rondas estan incluidas",
                "toda revision adicional puede generar costo extra",
                "cambios estructurales no cuentan como ajuste menor",
            ],
            "alcance": [
                "lo no descrito expresamente no se considera incluido",
                "cambios posteriores al cierre de propuesta deben documentarse",
            ],
        },
    }

    knowledge_base = {
        "faq": [
            {
                "question": "Cuando usar COM-001",
                "answer": "Cuando una persona necesita responder que servicio aplica o como orientar a un cliente.",
            },
            {
                "question": "Cuando usar COM-002",
                "answer": "Cuando ya existe una necesidad concreta y hay que estructurar una proforma o alcance preliminar.",
            },
            {
                "question": "Cuando no deberia salir una cotizacion final",
                "answer": "Cuando el brief esta incompleto, el servicio no existe en la matriz, el pricing sigue pendiente o operacion no valido factibilidad.",
            },
        ],
        "common_cases": [
            {
                "case": "cliente pide video por dos dias en Quito",
                "expected_services": ["AV-005", "AV-001"],
                "possible_complements": ["AV-004", "AV-007", "AV-008", "AV-011"],
            },
            {
                "case": "cliente pide pauta Spotify para multiples episodios",
                "expected_services": ["MK-004"],
                "possible_complements": ["AV-010", "AV-011", "AV-013"],
            },
            {
                "case": "cliente quiere una landing para captacion",
                "expected_services": ["DEV-001"],
                "possible_complements": ["MK-002", "MK-004"],
            },
        ],
        "common_objections": [
            "Solo quiero un precio rapido",
            "Quiero todo incluido",
            "Necesito para ya",
        ],
    }

    navigation_map = {
        "primary_command": canonical_navigation.get("cli", {}).get(
            "primary_command", "live"
        ),
        "command_aliases": canonical_navigation.get("cli", {}).get("aliases", []),
        "entry_points": canonical_navigation.get("entry_points", []),
        "roles": canonical_navigation.get("roles", []),
        "flows": canonical_navigation.get("flows", {}),
        "pending_disciplines": canonical_navigation.get("pending_disciplines", []),
    }
    return (
        quotation_rules,
        brief_templates,
        workflow,
        legal_commercial,
        knowledge_base,
        canonical_navigation.get("roles", []),
        navigation_map,
    )


def validate(service_matrix, pricing, prompts, agents):
    matrix_codes = {item["service_code"] for item in service_matrix}
    pricing_codes = {item["service_code"] for item in pricing}
    missing_codes = sorted(pricing_codes - matrix_codes)
    prompt_ids = [item["id"] for item in prompts if item["id"]]
    agent_names = {item["name"] for item in agents if item.get("name")}
    errors = []

    for prompt in prompts:
        category = prompt.get("category", "")
        if category and category not in VALID_PROMPT_CATEGORIES:
            errors.append(f"{prompt['path']}: category invalida '{category}'")

        agent_core = prompt.get("agent_core", "")
        if agent_core and agent_core not in agent_names:
            errors.append(f"{prompt['path']}: agent_core inexistente '{agent_core}'")

        for ref in prompt.get("source_of_truth", []):
            if not metadata_path_exists(ref):
                new_ref = ref.replace(
                    "manuales-produccion/", "manuales/produccion-audiovisual/"
                ).replace("manuales-desarrollo/", "manuales/desarrollo-software/")
                if not (ROOT / new_ref).exists() and not (MASTERS / new_ref).exists():
                    errors.append(
                        f"{prompt['path']}: source_of_truth inexistente '{ref}'"
                    )

    return missing_codes, prompt_ids, len(agents)


def main():
    canonical_navigation = load_canonical_navigation()
    services = parse_services()
    service_matrix = parse_service_matrix()
    pricing = parse_pricing()
    prompts = parse_prompts(canonical_navigation)
    agents = parse_agents(canonical_navigation)
    (
        quotation_rules,
        brief_templates,
        workflow,
        legal_commercial,
        knowledge_base,
        roles_map,
        navigation_map,
    ) = build_static_json(canonical_navigation)
    missing_codes, prompt_ids, agent_count = validate(
        service_matrix, pricing, prompts, agents
    )
    manuales_nuevos, disciplinas = parse_manuals_from_new_structure()

    write_json("services.json", services)
    write_json("service_matrix.json", service_matrix)
    write_json("pricing.json", pricing)
    write_json("quotation_rules.json", quotation_rules)
    write_json("brief_templates.json", brief_templates)
    write_json("workflow.json", workflow)
    write_json("legal_commercial.json", legal_commercial)
    write_json("knowledge_base.json", knowledge_base)
    write_json("roles_map.json", roles_map)
    write_json("navigation_map.json", navigation_map)
    write_json("taxonomy.json", canonical_navigation)
    write_json("prompts_operativos.json", prompts)
    write_json("agentes_maestros.json", agents)
    write_json(
        "manuales_maestros.json",
        {"manuals": manuales_nuevos, "disciplines": disciplinas},
    )

    write_text(
        "schema-notes.md",
        """
# Schema Notes

- `services.json` proviene del catalogo comercial.
- `service_matrix.json` y `pricing.json` se derivan de tablas markdown estructuradas.
- `prompts_operativos.json` y `agentes_maestros.json` mezclan metadatos, secciones textuales y ejemplos de uso.
- `quotation_rules.json`, `brief_templates.json`, `workflow.json`, `legal_commercial.json`, `knowledge_base.json`, `roles_map.json` y `navigation_map.json` se modelan como objetos y arrays de consumo frontend.
- Los campos pendientes se conservan como `PENDIENTE` para no falsear informacion.
        """,
    )
    write_text(
        "conversion-gaps.md",
        f"""
# Conversion Gaps

- Las fuentes markdown ya viven en `base/masters/`. Las rutas antiguas se mantienen por compatibilidad mediante enlaces simbolicos.
- Algunos prompts tienen estructura mas narrativa que tabular; por eso `when_to_use` y `expected_output` se resuelven combinando secciones y ejemplos.
- `pricing.json` conserva `PENDIENTE` donde no existen costos reales.
- `workflow.json` reutiliza la tabla de estados y completa pasos adicionales desde texto narrativo.
- Validacion de codigos faltantes en pricing vs matriz: {missing_codes if missing_codes else "sin faltantes"}.
- Total de prompts operativos convertidos: {len(prompt_ids)}.
- Total de agentes maestros convertidos: {agent_count}.
        """,
    )


if __name__ == "__main__":
    main()
