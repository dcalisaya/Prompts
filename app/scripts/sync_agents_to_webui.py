#!/usr/bin/env python3
"""
Sincroniza agentes del workspace con Open WebUI.

Este script:
1. Lee los agentes maestros desde base/json/agentes_maestros.json
2. Los convierte al formato de "Models" de Open WebUI
3. Crea/actualiza los modelos vía API

Requiere:
- OPEN_WEBUI_URL (default: http://localhost:3000)
- OPEN_WEBUI_TOKEN (API key de admin)

Uso:
    export OPEN_WEBUI_TOKEN=your-token
    python3 app/scripts/sync_agents_to_webui.py
"""

import json
import os
import sys
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[2]
JSON_DIR = ROOT / "base" / "json"

OPEN_WEBUI_URL = os.environ.get("OPEN_WEBUI_URL", "http://localhost:3000")
OPEN_WEBUI_TOKEN = os.environ.get("OPEN_WEBUI_TOKEN", "")

# Mapeo de agentes a modelos base
# Local (Ollama) vs Cloud (OpenAI/Anthropic)
AGENT_MODEL_MAPPING_LOCAL = {
    "EstrategaDigital": "llama-3.1-70b-ld",
    "ArquitectoSoftware": "qwen-coder-32b-ld",
    "TechLeadFullStack": "qwen-coder-32b-ld",
    "DevOpsEngineer": "qwen-coder-32b-ld",
    "QATester": "llama-3.1-70b-ld",
    "CodeAuditor": "qwen-coder-32b-ld",
    "DirectorAudiovisual": "llama-3.1-70b-ld",
    "GuionistaCinematografico": "llama-3.1-70b-ld",
    "DirectorFotografiaT2I": "llama-3.1-70b-ld",
    "DirectorTecnicoI2V": "llama-3.1-70b-ld",
    "ArtistaStoryboard": "llama-3.1-70b-ld",
    "TraffickerEspecialista": "llama-3.1-70b-ld",
    "AuditorCalidad": "llama-3.1-70b-ld",
}

AGENT_MODEL_MAPPING_CLOUD = {
    "EstrategaDigital": "gpt-4o-ld",           # Estrategia: GPT-4o
    "ArquitectoSoftware": "o3-mini-ld",        # Arquitectura: o3-mini (razonamiento)
    "TechLeadFullStack": "claude-sonnet-ld",   # Código: Claude Sonnet
    "DevOpsEngineer": "claude-sonnet-ld",      # Código: Claude Sonnet
    "QATester": "gpt-4o-ld",                   # Testing: GPT-4o
    "CodeAuditor": "claude-sonnet-ld",         # Auditoría: Claude Sonnet
    "DirectorAudiovisual": "gpt-4o-ld",        # Creativo: GPT-4o
    "GuionistaCinematografico": "gpt-4o-ld",   # Creativo: GPT-4o
    "DirectorFotografiaT2I": "gpt-4o-ld",      # Visual: GPT-4o
    "DirectorTecnicoI2V": "gpt-4o-ld",         # Visual: GPT-4o
    "ArtistaStoryboard": "gpt-4o-ld",          # Visual: GPT-4o
    "TraffickerEspecialista": "gpt-4o-ld",     # Marketing: GPT-4o
    "AuditorCalidad": "gpt-4o-ld",             # Calidad: GPT-4o
}


def load_agents():
    """Carga los agentes desde JSON."""
    path = JSON_DIR / "agentes_maestros.json"
    if not path.exists():
        print(f"❌ No se encontró {path}")
        print("Ejecuta primero: python3 app/scripts/build_json.py")
        sys.exit(1)
    return json.loads(path.read_text(encoding="utf-8"))


def format_system_prompt(agent: dict) -> str:
    """Formatea el system prompt para Open WebUI."""
    lines = [
        f"# {agent['name']}",
        "",
        f"**Descripción:** {agent.get('description', '')}",
        "",
        "## Filosofía",
        agent.get("philosophy", ""),
        "",
        "## Habilidades",
    ]
    
    for skill in agent.get("skills", []):
        lines.append(f"- {skill}")
    
    lines.extend([
        "",
        "## Tareas Operativas",
    ])
    
    for task in agent.get("tasks", []):
        lines.append(f"- {task}")
    
    lines.extend([
        "",
        "## Tono de Voz",
        agent.get("tone", ""),
        "",
        "## Comando de Inicio",
        agent.get("start_command", ""),
    ])
    
    return "\n".join(lines)


def create_model_payload(agent: dict, cloud_mode: bool = False) -> dict:
    """Crea el payload para crear/actualizar un modelo en Open WebUI."""
    name = agent["name"]
    
    # Seleccionar mapeo según modo
    if cloud_mode:
        base_model = AGENT_MODEL_MAPPING_CLOUD.get(name, "gpt-4o-ld")
    else:
        base_model = AGENT_MODEL_MAPPING_LOCAL.get(name, "llama-3.1-70b-ld")
    
    # Nombre visible con emoji
    name_mapping = {
        "EstrategaDigital": "🇪🇸 Estratega Digital",
        "ArquitectoSoftware": "🇪🇸 Arquitecto de Software",
        "TechLeadFullStack": "🇪🇸 Tech Lead Full Stack",
        "DevOpsEngineer": "🇪🇸 DevOps Engineer",
        "QATester": "🇪🇸 QA Tester",
        "CodeAuditor": "🇪🇸 Code Auditor",
        "DirectorAudiovisual": "🇪🇸 Director Audiovisual",
        "GuionistaCinematografico": "🇪🇸 Guionista Cinematográfico",
        "DirectorFotografiaT2I": "🇪🇸 Director de Fotografía T2I",
        "DirectorTecnicoI2V": "🇪🇸 Director Técnico I2V",
        "ArtistaStoryboard": "🇪🇸 Artista Storyboard",
        "TraffickerEspecialista": "🇪🇸 Trafficker Especialista",
        "AuditorCalidad": "🇪🇸 Auditor de Calidad",
    }
    
    display_name = name_mapping.get(name, f"🇪🇸 {name}")
    
    return {
        "id": f"ld-{name.lower()}",
        "name": display_name,
        "base_model_id": base_model,
        "system": format_system_prompt(agent),
        "params": {
            "temperature": 0.7,
            "max_tokens": 4096,
        },
        "meta": {
            "description": agent.get("description", ""),
            "profile_image_url": None,
        },
        "access_control": None,  # Público para todos los usuarios
    }


def sync_agent(agent: dict, cloud_mode: bool = False) -> bool:
    """Sincroniza un agente con Open WebUI."""
    headers = {
        "Authorization": f"Bearer {OPEN_WEBUI_TOKEN}",
        "Content-Type": "application/json",
    }
    
    payload = create_model_payload(agent, cloud_mode)
    model_id = payload["id"]
    
    # Verificar si ya existe
    check_url = f"{OPEN_WEBUI_URL}/api/models/{model_id}"
    try:
        resp = requests.get(check_url, headers=headers, timeout=10)
        exists = resp.status_code == 200
    except requests.RequestException as e:
        print(f"⚠️  Error verificando {model_id}: {e}")
        exists = False
    
    # Crear o actualizar
    if exists:
        url = f"{OPEN_WEBUI_URL}/api/models/{model_id}"
        method = requests.post  # Open WebUI usa POST para updates también
        action = "Actualizado"
    else:
        url = f"{OPEN_WEBUI_URL}/api/models/create"
        method = requests.post
        action = "Creado"
    
    try:
        resp = method(url, headers=headers, json=payload, timeout=30)
        resp.raise_for_status()
        print(f"✅ {action}: {payload['name']}")
        return True
    except requests.RequestException as e:
        print(f"❌ Error sincronizando {model_id}: {e}")
        return False


def main():
    """Sincroniza todos los agentes."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Sincroniza agentes con Open WebUI")
    parser.add_argument(
        "--cloud", 
        action="store_true", 
        help="Usar modelos cloud (OpenAI/Anthropic) en lugar de locales"
    )
    parser.add_argument(
        "--url",
        default=OPEN_WEBUI_URL,
        help=f"URL de Open WebUI (default: {OPEN_WEBUI_URL})"
    )
    parser.add_argument(
        "--token",
        default=OPEN_WEBUI_TOKEN,
        help="Token de API de Open WebUI"
    )
    args = parser.parse_args()
    
    url = args.url
    token = args.token
    cloud_mode = args.cloud
    
    if not token:
        print("❌ Token no configurado")
        print("\nOpciones:")
        print("1. Exporta variable: export OPEN_WEBUI_TOKEN=sk-...")
        print("2. Pasa como argumento: --token sk-...")
        print("\nPara obtener tu token:")
        print("- Ve a Open WebUI → Admin Panel → Settings → API Keys")
        sys.exit(1)
    
    mode_str = "CLOUD (OpenAI/Anthropic)" if cloud_mode else "LOCAL (Ollama)"
    print(f"Conectando a Open WebUI: {url}")
    print(f"Modo: {mode_str}")
    print("-" * 50)
    
    agents = load_agents()
    print(f"Total agentes a sincronizar: {len(agents)}\n")
    
    success = 0
    failed = 0
    
    for agent in agents:
        if sync_agent(agent, cloud_mode):
            success += 1
        else:
            failed += 1
    
    print("-" * 50)
    print(f"\n✅ Exitosos: {success}")
    print(f"❌ Fallidos: {failed}")
    
    if failed == 0:
        print("\n🎉 Todos los agentes sincronizados correctamente!")
        print("\nPróximos pasos:")
        print("1. Ve a Open WebUI → Admin Panel → Models")
        print("2. Verifica que los agentes aparecen con 🇪🇸")
        print("3. Crea Knowledge Collections con la documentación")
        
        if cloud_mode:
            print("\n💰 Recuerda: En modo cloud se consumen créditos de API")
    else:
        print("\n⚠️  Algunos agentes no se sincronizaron. Revisa los errores arriba.")
        sys.exit(1)


if __name__ == "__main__":
    main()
