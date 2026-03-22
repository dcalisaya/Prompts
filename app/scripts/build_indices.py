#!/usr/bin/env python3
"""
Genera índices markdown para navegación del workspace.
Reemplaza la necesidad de symlinks.

Uso:
    python3 app/scripts/build_indices.py
"""

import json
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]
JSON_DIR = ROOT / "base" / "json"
PORTAL_DIR = ROOT / "portal"
MASTERS_DIR = ROOT / "base" / "masters"


def load_json(filename: str) -> dict | list:
    """Carga un archivo JSON."""
    path = JSON_DIR / filename
    if not path.exists():
        raise FileNotFoundError(f"No se encontró {path}. Ejecuta build_json.py primero.")
    return json.loads(path.read_text(encoding="utf-8"))


def make_link(text: str, path: Path) -> str:
    """Crea un link markdown absoluto."""
    return f"[{text}]({path})"


def generate_master_index():
    """Genera el índice maestro del workspace."""
    
    lines = [
        "# Portal Live Developer",
        "",
        f"*Generado automáticamente el {datetime.now().strftime('%Y-%m-%d %H:%M')}*",
        "",
        "## Navegación Rápida",
        "",
        "### Por Rol",
        "",
    ]
    
    roles = load_json("roles_map.json")
    navigation_map = load_json("navigation_map.json")
    for role in roles:
        lines.append(f"- [{role['role']}](por-rol/{role['slug']}.md)")
    
    lines.extend([
        "",
        "### Por Área",
        "",
        "- [Agentes Maestros](por-area/agentes.md)",
        "- [Prompts Operativos](por-area/prompts.md)",
        "- [Manuales](por-area/manuales.md)",
        "- [Servicios](por-area/servicios.md)",
        "",
        "### Flujos de Trabajo",
        "",
        f"- [{navigation_map['flows']['proforma']['label']}](flujos/proforma.md)",
        f"- [{navigation_map['flows']['desarrollo']['label']}](flujos/desarrollo.md)",
        f"- [{navigation_map['flows']['podcast']['label']}](flujos/podcast.md)",
        "",
        "## Estructura del Workspace",
        "",
        "```",
        "base/masters/",
        "├── company/          # Documentos operativos y de negocio",
        "├── catalog/          # Catálogo de servicios",
        "├── agents/           # Agentes maestros",
        "├── prompts-operativos/  # Prompts por área",
        "├── manuales-produccion/ # Guías de producción audiovisual",
        "└── manuales-desarrollo/ # Guías de desarrollo de software",
        "",
        "portal/               # Índices generados (tú estás aquí)",
        "app/                  # CLI, API y Docker stack",
        "```",
        "",
        "## Uso con el CLI",
        "",
        "```bash",
        "# Instalar el CLI",
        "pip install -e app/cli/",
        "",
        "# Navegar por rol",
        "live role comercial",
        "live role desarrollo",
        "",
        "# Buscar agentes y prompts",
        "live agent estratega",
        "live prompt COM-001",
        "",
        "# Ver flujos completos",
        "live flow proforma",
        "```",
        "",
    ])
    
    return "\n".join(lines)


def generate_role_index(role: dict) -> str:
    """Genera un índice para un rol específico."""
    
    role_name = role["role"]
    documents = role.get("documents", [])
    outcomes = role.get("outcome", [])
    
    lines = [
        f"# {role_name}",
        "",
        f"**Resultado esperado:** {', '.join(outcomes)}",
        "",
        "## Documentos y Recursos",
        "",
    ]
    
    for doc in documents:
        # Buscar la ruta real del documento
        path = find_document_path(doc)
        if path:
            lines.append(f"- {make_link(doc, path)}")
        else:
            lines.append(f"- {doc} *(no encontrado)*")
    
    lines.extend([
        "",
        f"**Disciplina:** {role.get('discipline', 'N/A')}",
        "",
        "",
    ])

    lines.append("")
    return "\n".join(lines)


def generate_agents_index() -> str:
    """Genera índice de todos los agentes."""
    agents = load_json("agentes_maestros.json")
    
    lines = [
        "# Agentes Maestros",
        "",
        f"*Total: {len(agents)} agentes*",
        "",
    ]
    
    categorias = {}
    for agent in agents:
        categoria = agent.get("discipline") or "Sin disciplina"
        categorias.setdefault(categoria, []).append(agent)
    
    for categoria, agentes_list in categorias.items():
        if agentes_list:
            lines.append(f"## {categoria}")
            lines.append("")
            for agent in agentes_list:
                path = ROOT / agent["path"]
                lines.append(f"### {make_link(agent['name'], path)}")
                lines.append(f"{agent.get('description', 'Sin descripción')}")
                lines.append("")
                if agent.get("roles"):
                    lines.append(f"**Roles:** {', '.join(agent['roles'])}")
                if agent.get("skills"):
                    lines.append(f"**Habilidades:** {', '.join(agent['skills'][:3])}...")
                lines.append("")
    
    return "\n".join(lines)


def generate_prompts_index() -> str:
    """Genera índice de todos los prompts."""
    prompts = load_json("prompts_operativos.json")
    
    lines = [
        "# Prompts Operativos",
        "",
        f"*Total: {len(prompts)} prompts*",
        "",
    ]
    
    # Agrupar por disciplina
    by_category = {}
    for p in prompts:
        cat = p.get("discipline") or p.get("category", "Sin categoría")
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(p)
    
    for cat, prompts_list in sorted(by_category.items()):
        lines.append(f"## {cat}")
        lines.append("")
        for p in prompts_list:
            pid = p.get("id", "Sin ID")
            name = p.get("name", "Sin nombre")
            path = ROOT / p["path"]
            obj = p.get("objective", "")[:80]
            lines.append(f"- **{pid}**: {make_link(name, path)}")
            if p.get("roles"):
                lines.append(f"  - Roles: {', '.join(p['roles'])}")
            if obj:
                lines.append(f"  - {obj}...")
        lines.append("")
    
    return "\n".join(lines)


def generate_manuales_index() -> str:
    """Genera índice de manuales."""
    lines = [
        "# Manuales",
        "",
        "## Producción Audiovisual",
        "",
    ]
    
    prod_dir = MASTERS_DIR / "manuales-produccion"
    if prod_dir.exists():
        for f in sorted(prod_dir.glob("*.md")):
            lines.append(f"- {make_link(f.stem, f)}")
    
    lines.extend([
        "",
        "## Desarrollo de Software",
        "",
    ])
    
    dev_dir = MASTERS_DIR / "manuales-desarrollo"
    if dev_dir.exists():
        for f in sorted(dev_dir.glob("*.md")):
            lines.append(f"- {make_link(f.stem, f)}")
    
    lines.append("")
    return "\n".join(lines)


def generate_services_index() -> str:
    """Genera índice de servicios."""
    services = load_json("service_matrix.json")
    
    lines = [
        "# Catálogo de Servicios",
        "",
        f"*Total: {len(services)} servicios*",
        "",
    ]
    
    # Agrupar por categoría
    by_category = {}
    for s in services:
        cat = s.get("category", "Sin categoría")
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(s)
    
    for cat, services_list in sorted(by_category.items()):
        lines.append(f"## {cat}")
        lines.append("")
        for s in services_list:
            code = s.get("service_code", "")
            name = s.get("service_name", "")
            unit = s.get("unit", "")
            scope = s.get("scope_base", "")[:60]
            lines.append(f"### {code}: {name}")
            lines.append(f"**Unidad:** {unit}")
            if scope:
                lines.append(f"**Alcance:** {scope}...")
            lines.append("")
    
    return "\n".join(lines)


def find_document_path(doc_name: str) -> Path | None:
    """Encuentra la ruta de un documento por nombre."""
    search_paths = [
        MASTERS_DIR / "company" / f"{doc_name}.md",
        MASTERS_DIR / "catalog" / f"{doc_name}.md",
        MASTERS_DIR / "agents" / f"{doc_name}.md",
        MASTERS_DIR / "prompts-operativos" / f"{doc_name}.md",
        ROOT / f"{doc_name}.md",
    ]
    
    for p in search_paths:
        if p.exists():
            return p
    
    return None


def main():
    """Genera todos los índices."""
    print("Generando índices del workspace...")
    
    # Crear directorios
    PORTAL_DIR.mkdir(parents=True, exist_ok=True)
    (PORTAL_DIR / "por-rol").mkdir(exist_ok=True)
    (PORTAL_DIR / "por-area").mkdir(exist_ok=True)
    (PORTAL_DIR / "flujos").mkdir(exist_ok=True)
    
    # Índice maestro
    master = generate_master_index()
    (PORTAL_DIR / "README.md").write_text(master, encoding="utf-8")
    print(f"✓ {PORTAL_DIR / 'README.md'}")
    
    # Índices por rol
    roles = load_json("roles_map.json")
    for role in roles:
        content = generate_role_index(role)
        role_path = PORTAL_DIR / "por-rol" / f"{role['slug']}.md"
        role_path.write_text(content, encoding="utf-8")
        print(f"✓ {role_path}")
    
    # Índice de agentes
    agents_idx = generate_agents_index()
    (PORTAL_DIR / "por-area" / "agentes.md").write_text(agents_idx, encoding="utf-8")
    print(f"✓ {PORTAL_DIR / 'por-area' / 'agentes.md'}")
    
    # Índice de prompts
    prompts_idx = generate_prompts_index()
    (PORTAL_DIR / "por-area" / "prompts.md").write_text(prompts_idx, encoding="utf-8")
    print(f"✓ {PORTAL_DIR / 'por-area' / 'prompts.md'}")
    
    # Índice de manuales
    manuales_idx = generate_manuales_index()
    (PORTAL_DIR / "por-area" / "manuales.md").write_text(manuales_idx, encoding="utf-8")
    print(f"✓ {PORTAL_DIR / 'por-area' / 'manuales.md'}")
    
    # Índice de servicios
    services_idx = generate_services_index()
    (PORTAL_DIR / "por-area" / "servicios.md").write_text(services_idx, encoding="utf-8")
    print(f"✓ {PORTAL_DIR / 'por-area' / 'servicios.md'}")

    navigation_map = load_json("navigation_map.json")
    for flow_key, flow in navigation_map.get("flows", {}).items():
        lines = [f"# {flow['label']}", ""]
        for index, step in enumerate(flow.get("steps", []), 1):
            nombre, ruta = step
            lines.append(f"{index}. {make_link(nombre, ROOT / ruta)}")
        lines.append("")
        (PORTAL_DIR / "flujos" / f"{flow_key}.md").write_text("\n".join(lines), encoding="utf-8")
        print(f"✓ {PORTAL_DIR / 'flujos' / f'{flow_key}.md'}")
    
    print("\n✅ Índices generados exitosamente.")
    print(f"\nPara ver el portal:")
    print(f"  open {PORTAL_DIR / 'README.md'}")


if __name__ == "__main__":
    main()
