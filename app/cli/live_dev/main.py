#!/usr/bin/env python3
"""
Live Developer CLI (live)

Herramienta de navegación inteligente para el workspace de prompts,
agentes y recursos operativos de Live Developer.

Uso:
    live role comercial       # Abre todo lo relacionado a comercial
    live agent estratega      # Abre el agente específico
    live prompt COM-001       # Abre prompt por código
    live flow proforma        # Abre secuencia de flujo
    live find "cotización"    # Busca en todos los docs
"""

import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Optional

import typer
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.tree import Tree

app = typer.Typer(
    name="live",
    help="Live Developer CLI - Navegación del workspace",
    add_completion=False,
)
console = Console()

# Detectar root del workspace
WORKSPACE_ROOT = Path(__file__).resolve().parents[3]
JSON_DIR = WORKSPACE_ROOT / "base" / "json"
MASTERS_DIR = WORKSPACE_ROOT / "base" / "masters"
PORTAL_DIR = WORKSPACE_ROOT / "portal"


def load_json(filename: str) -> dict | list:
    """Carga un archivo JSON del directorio base/json."""
    path = JSON_DIR / filename
    if not path.exists():
        console.print(f"[red]Error: No se encontró {path}[/red]")
        console.print("[yellow]Ejecuta: python3 app/scripts/build_json.py[/yellow]")
        sys.exit(1)
    return json.loads(path.read_text(encoding="utf-8"))


def open_file(path: Path) -> None:
    """Abre un archivo con el editor por defecto del sistema."""
    if not path.exists():
        console.print(f"[red]Archivo no encontrado: {path}[/red]")
        raise typer.Exit(1)
    
    # Detectar sistema operativo
    if sys.platform == "darwin":  # macOS
        subprocess.run(["open", str(path)])
    elif sys.platform == "linux":
        subprocess.run(["xdg-open", str(path)])
    else:  # Windows
        os.startfile(str(path))
    
    console.print(f"[green]Abierto:[/green] {path}")


def get_editor() -> str:
    """Detecta el editor preferido del usuario."""
    return os.environ.get("EDITOR", "code")  # Default VS Code


@app.command()
def role(
    rol: str = typer.Argument(..., help="Nombre del rol: comercial, estratega, desarrollo, produccion, trafficker, coordinacion"),
    abrir: bool = typer.Option(False, "--abrir", "-a", help="Abrir el índice en el editor"),
):
    """Muestra recursos disponibles para un rol específico."""
    roles_map = load_json("roles_map.json")
    
    # Buscar el rol (búsqueda parcial)
    rol_lower = rol.lower()
    encontrado = None
    for r in roles_map:
        if rol_lower in r["role"].lower():
            encontrado = r
            break
    
    if not encontrado:
        console.print(f"[red]Rol '{rol}' no encontrado.[/red]")
        console.print("[yellow]Roles disponibles:[/yellow]")
        for r in roles_map:
            console.print(f"  • {r['role']}")
        raise typer.Exit(1)
    
    # Mostrar información
    table = Table(title=f"🎯 {encontrado['role']}", show_header=False)
    table.add_column("Recurso", style="cyan")
    table.add_column("Archivo", style="green")
    
    for doc in encontrado.get("documents", []):
        # Buscar ruta real
        path = find_document_path(doc)
        table.add_row(doc, str(path) if path else "[red]No encontrado[/red]")
    
    console.print(table)
    
    # Outcomes
    console.print(f"\n[bold]Resultado esperado:[/bold] {', '.join(encontrado.get('outcome', []))}")
    
    # Abrir índice si se solicita
    if abrir:
        index_path = PORTAL_DIR / "por-rol" / f"{encontrado.get('slug', rol_lower)}.md"
        if index_path.exists():
            open_file(index_path)


@app.command()
def agent(
    nombre: str = typer.Argument(..., help="Nombre del agente (parcial): estratega, director, techlead, etc."),
    abrir: bool = typer.Option(True, "--abrir/--no-abrir", "-a/-A", help="Abrir el archivo del agente"),
):
    """Busca y abre un agente maestro por nombre."""
    agents = load_json("agentes_maestros.json")
    
    nombre_lower = nombre.lower()
    matches = [
        a for a in agents 
        if nombre_lower in a["name"].lower() or nombre_lower in a.get("role", "").lower()
    ]
    
    if not matches:
        console.print(f"[red]No se encontró agente: {nombre}[/red]")
        console.print("\n[bold]Agentes disponibles:[/bold]")
        for a in agents:
            console.print(f"  • {a['name']}")
        raise typer.Exit(1)
    
    if len(matches) > 1:
        console.print(f"[yellow]Múltiples coincidencias para '{nombre}':[/yellow]")
        for i, a in enumerate(matches, 1):
            console.print(f"  {i}. {a['name']} - {a.get('description', 'Sin descripción')[:60]}...")
        
        seleccion = typer.prompt("Selecciona número", type=int, default=1)
        agente = matches[seleccion - 1]
    else:
        agente = matches[0]
    
    path = WORKSPACE_ROOT / agente["path"]
    console.print(Panel.fit(
        f"[bold]{agente['name']}[/bold]\n"
        f"{agente.get('description', 'Sin descripción')}\n"
        f"[dim]{path}[/dim]",
        title="🤖 Agente Maestro"
    ))
    
    if abrir:
        open_file(path)


@app.command()
def prompt(
    codigo: str = typer.Argument(..., help="Código del prompt: COM-001, DEV-002, FUN-001, etc."),
    abrir: bool = typer.Option(True, "--abrir/--no-abrir", "-a/-A", help="Abrir el archivo del prompt"),
):
    """Busca y abre un prompt operativo por su código."""
    prompts = load_json("prompts_operativos.json")
    
    codigo_upper = codigo.upper()
    match = None
    for p in prompts:
        if p.get("id", "").upper() == codigo_upper:
            match = p
            break
    
    if not match:
        # Búsqueda parcial
        matches = [p for p in prompts if codigo_upper in p.get("id", "").upper()]
        if len(matches) == 1:
            match = matches[0]
        elif len(matches) > 1:
            console.print(f"[yellow]Múltiples coincidencias:[/yellow]")
            for p in matches:
                console.print(f"  • {p.get('id')}: {p.get('name')}")
            raise typer.Exit(0)
    
    if not match:
        console.print(f"[red]Prompt '{codigo}' no encontrado.[/red]")
        console.print(f"[yellow]Total prompts cargados: {len(prompts)}[/yellow]")
        raise typer.Exit(1)
    
    path = WORKSPACE_ROOT / match["path"]
    console.print(Panel.fit(
        f"[bold]{match.get('id')}:[/bold] {match.get('name')}\n"
        f"[cyan]Categoría:[/cyan] {match.get('category', 'N/A')}\n"
        f"[cyan]Objetivo:[/cyan] {match.get('objective', 'N/A')[:100]}...\n"
        f"[dim]{path}[/dim]",
        title="📝 Prompt Operativo"
    ))
    
    if abrir:
        open_file(path)


@app.command()
def flow(
    flujo: str = typer.Argument(..., help="Nombre del flujo: proforma, podcast, cotizacion, desarrollo"),
):
    """Muestra la secuencia de documentos para un flujo de trabajo completo."""
    navigation_map = load_json("navigation_map.json")
    flows = navigation_map.get("flows", {})
    
    flujo_lower = flujo.lower()
    if flujo_lower not in flows:
        console.print(f"[red]Flujo '{flujo}' no encontrado.[/red]")
        console.print(f"[yellow]Flujos disponibles: {', '.join(flows.keys())}[/yellow]")
        raise typer.Exit(1)
    
    tree = Tree(f"🔄 [bold]Flujo: {flujo}[/bold]")
    for i, (nombre, ruta) in enumerate(flows[flujo_lower]["steps"], 1):
        path = WORKSPACE_ROOT / ruta
        exists = "✓" if path.exists() else "✗"
        tree.add(f"{exists} {i}. {nombre}\n   [dim]{ruta}[/dim]")
    
    console.print(tree)
    
    # Ofrecer abrir el primero
    if typer.confirm("¿Abrir el primer documento?"):
        first_path = WORKSPACE_ROOT / flows[flujo_lower]["steps"][0][1]
        open_file(first_path)


@app.command()
def find(
    query: str = typer.Argument(..., help="Término de búsqueda"),
    en: str = typer.Option("todo", "--en", "-e", help="Buscar en: todo, agentes, prompts, servicios"),
):
    """Busca en todo el workspace por término."""
    query_lower = query.lower()
    resultados = []
    
    if en in ("todo", "agentes"):
        agents = load_json("agentes_maestros.json")
        for a in agents:
            score = 0
            if query_lower in a["name"].lower():
                score += 10
            if query_lower in a.get("description", "").lower():
                score += 5
            if any(query_lower in s.lower() for s in a.get("skills", [])):
                score += 3
            if score > 0:
                resultados.append(("AGENTE", a["name"], a.get("description", "")[:50], score))
    
    if en in ("todo", "prompts"):
        prompts = load_json("prompts_operativos.json")
        for p in prompts:
            score = 0
            if query_lower in p.get("id", "").lower():
                score += 10
            if query_lower in p.get("name", "").lower():
                score += 8
            if query_lower in p.get("objective", "").lower():
                score += 5
            if score > 0:
                resultados.append(("PROMPT", f"{p.get('id')}: {p['name']}", p.get("objective", "")[:50], score))
    
    if en in ("todo", "servicios"):
        services = load_json("service_matrix.json")
        for s in services:
            score = 0
            if query_lower in s.get("service_code", "").lower():
                score += 10
            if query_lower in s.get("service_name", "").lower():
                score += 8
            if score > 0:
                resultados.append(("SERVICIO", f"{s['service_code']}: {s['service_name']}", s.get("scope_base", "")[:50], score))
    
    # Ordenar por score
    resultados.sort(key=lambda x: x[3], reverse=True)
    
    if not resultados:
        console.print(f"[yellow]No se encontraron resultados para '{query}'[/yellow]")
        return
    
    table = Table(title=f"🔍 Resultados para '{query}'")
    table.add_column("Tipo", style="cyan")
    table.add_column("Nombre", style="green")
    table.add_column("Descripción", style="dim")
    
    for tipo, nombre, desc, _ in resultados[:15]:  # Top 15
        table.add_row(tipo, nombre, desc + "...")
    
    console.print(table)
    console.print(f"[dim]Mostrando {min(len(resultados), 15)} de {len(resultados)} resultados[/dim]")


@app.command()
def index(
    refresh: bool = typer.Option(False, "--refresh", "-r", help="Regenerar índices markdown"),
    abrir: bool = typer.Option(False, "--abrir", "-a", help="Abrir índice maestro"),
):
    """Muestra o regenera los índices del workspace."""
    if refresh:
        script = WORKSPACE_ROOT / "app" / "scripts" / "build_indices.py"
        if script.exists():
            console.print("[cyan]Regenerando índices...[/cyan]")
            result = subprocess.run([sys.executable, str(script)], capture_output=True, text=True)
            if result.returncode == 0:
                console.print("[green]✓ Índices regenerados[/green]")
            else:
                console.print(f"[red]Error: {result.stderr}[/red]")
        else:
            console.print("[red]Script build_indices.py no encontrado[/red]")
    
    # Mostrar índices disponibles
    if PORTAL_DIR.exists():
        console.print("\n[bold]📚 Índices disponibles:[/bold]")
        for f in sorted(PORTAL_DIR.glob("*.md")):
            console.print(f"  • {f.name}")
        
        if (PORTAL_DIR / "por-rol").exists():
            console.print("\n[bold]Por Rol:[/bold]")
        for f in sorted((PORTAL_DIR / "por-rol").glob("*.md")):
            console.print(f"  • {f.stem}")
    
    if abrir:
        index_path = PORTAL_DIR / "README.md"
        if index_path.exists():
            open_file(index_path)


@app.command()
def servicio(
    codigo: str = typer.Argument(..., help="Código del servicio: AV-001, DEV-002, MK-003, etc."),
):
    """Busca información de un servicio por código."""
    services = load_json("service_matrix.json")
    pricing = load_json("pricing.json")
    
    codigo_upper = codigo.upper()
    match = None
    for s in services:
        if s.get("service_code", "").upper() == codigo_upper:
            match = s
            break
    
    if not match:
        console.print(f"[red]Servicio '{codigo}' no encontrado.[/red]")
        raise typer.Exit(1)
    
    # Buscar pricing
    price_info = None
    for p in pricing:
        if p.get("service_code", "").upper() == codigo_upper:
            price_info = p
            break
    
    console.print(Panel.fit(
        f"[bold]{match['service_code']}:[/bold] {match['service_name']}\n"
        f"[cyan]Categoría:[/cyan] {match.get('category', 'N/A')}\n"
        f"[cyan]Unidad:[/cyan] {match.get('unit', 'N/A')}\n"
        f"[cyan]Área responsable:[/cyan] {match.get('owner_area', 'N/A')}\n\n"
        f"[cyan]Alcance base:[/cyan]\n{match.get('scope_base', 'N/A')}\n\n"
        f"[cyan]No incluye:[/cyan]\n{match.get('not_included', 'N/A')}",
        title="📋 Servicio"
    ))
    
    if price_info:
        console.print(f"\n[bold]💰 Pricing:[/bold] {price_info}")


@app.callback()
def main(
    version: bool = typer.Option(False, "--version", "-v", help="Mostrar versión"),
):
    """Live Developer CLI - Navegación inteligente del workspace."""
    if version:
        console.print("[bold]live[/bold] (Live Developer CLI) v0.1.0")
        raise typer.Exit()


def find_document_path(doc_name: str) -> Optional[Path]:
    """Encuentra la ruta de un documento por nombre (soporta partial matches)."""
    # Normalizar: quitar .md si ya está incluido
    base_name = doc_name.replace('.md', '')
    
    # Primero intentar match exacto
    search_paths = [
        MASTERS_DIR / "company" / f"{base_name}.md",
        MASTERS_DIR / "catalog" / f"{base_name}.md",
        MASTERS_DIR / "agents" / f"{base_name}.md",
        WORKSPACE_ROOT / f"{base_name}.md",
    ]
    
    for p in search_paths:
        if p.exists():
            return p
    
    # Si no hay match exacto, buscar archivos que empiecen con el nombre
    # Ej: COM-001 encuentra COM-001-Asesor-Servicios-LiveDeveloper.md
    search_dirs = [
        MASTERS_DIR / "company",
        MASTERS_DIR / "catalog",
        MASTERS_DIR / "agents",
        MASTERS_DIR / "prompts-operativos",
    ]
    
    for dir_path in search_dirs:
        if dir_path.exists():
            # Buscar en subdirectorios también
            for md_file in dir_path.rglob("*.md"):
                if md_file.stem.startswith(base_name) or base_name in md_file.stem:
                    return md_file
    
    return None


if __name__ == "__main__":
    app()
