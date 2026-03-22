"""
Live Developer API

API FastAPI para exponer datos del workspace:
- Servicios y catálogo
- Pricing
- Prompts y agentes
- Generación de proformas
- Validación de briefs
"""

import json
import os
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Live Developer API",
    description="API para acceder a prompts, agentes, servicios y pricing del workspace",
    version="0.1.0",
)

# CORS para permitir acceso desde Open WebUI y otras interfaces
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
WORKSPACE_ROOT = Path(__file__).resolve().parents[2]
JSON_DIR = WORKSPACE_ROOT / "base" / "json"


def load_json(filename: str) -> dict | list:
    """Carga un archivo JSON del directorio base/json."""
    path = JSON_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=500, detail=f"Archivo {filename} no encontrado. Ejecuta build_json.py")
    return json.loads(path.read_text(encoding="utf-8"))


# ============ MODELOS ============

class Service(BaseModel):
    service_code: str
    service_name: str
    category: str
    unit: str
    scope_base: str = ""
    not_included: str = ""
    inputs: list[str] = []
    owner_area: str = ""


class Pricing(BaseModel):
    service_code: str
    # Campos flexibles según el pricing real
    model_config = {"extra": "allow"}


class Prompt(BaseModel):
    id: str
    name: str
    category: str
    agent_core: str = ""
    objective: str = ""
    when_to_use: str = ""
    path: str = ""


class Agent(BaseModel):
    name: str
    role: str
    description: str
    skills: list[str] = []
    tasks: list[str] = []
    path: str = ""


class QuoteRequest(BaseModel):
    client_name: str
    services: list[str] = Field(..., description="Lista de service_codes")
    notes: str = ""


class QuoteResponse(BaseModel):
    client_name: str
    items: list[dict]
    subtotal: float
    total: float
    warnings: list[str] = []


class BriefRequest(BaseModel):
    brief_type: str = Field(..., description="Tipo de brief: comercial_general, audiovisual, podcast, etc.")
    data: dict = Field(..., description="Datos del brief")


class BriefValidation(BaseModel):
    is_complete: bool
    missing_fields: list[str]
    warnings: list[str]
    suggested_services: list[str] = []


# ============ ENDPOINTS ============

@app.get("/")
def root():
    return {
        "name": "Live Developer API",
        "version": "0.1.0",
        "endpoints": [
            "/api/v1/services",
            "/api/v1/services/{code}",
            "/api/v1/pricing",
            "/api/v1/prompts",
            "/api/v1/agents",
            "/api/v1/quote",
            "/api/v1/brief/validate",
        ]
    }


@app.get("/api/v1/services", response_model=list[Service])
def get_services():
    """Obtiene todos los servicios del catálogo."""
    return load_json("service_matrix.json")


@app.get("/api/v1/services/{code}")
def get_service(code: str):
    """Obtiene un servicio específico por su código."""
    services = load_json("service_matrix.json")
    code_upper = code.upper()
    
    for s in services:
        if s.get("service_code", "").upper() == code_upper:
            # Buscar pricing también
            pricing = load_json("pricing.json")
            price_info = None
            for p in pricing:
                if p.get("service_code", "").upper() == code_upper:
                    price_info = p
                    break
            
            result = dict(s)
            result["pricing"] = price_info
            return result
    
    raise HTTPException(status_code=404, detail=f"Servicio {code} no encontrado")


@app.get("/api/v1/pricing")
def get_pricing():
    """Obtiene la tabla de pricing interno."""
    return load_json("pricing.json")


@app.get("/api/v1/prompts", response_model=list[Prompt])
def get_prompts(
    category: str | None = None,
    agent_core: str | None = None,
):
    """Obtiene todos los prompts operativos, con filtros opcionales."""
    prompts = load_json("prompts_operativos.json")
    
    if category:
        prompts = [p for p in prompts if category.lower() in p.get("category", "").lower()]
    
    if agent_core:
        prompts = [p for p in prompts if agent_core.lower() in p.get("agent_core", "").lower()]
    
    return prompts


@app.get("/api/v1/prompts/{prompt_id}")
def get_prompt(prompt_id: str):
    """Obtiene un prompt específico por su ID (ej: COM-001)."""
    prompts = load_json("prompts_operativos.json")
    prompt_id_upper = prompt_id.upper()
    
    for p in prompts:
        if p.get("id", "").upper() == prompt_id_upper:
            return p
    
    raise HTTPException(status_code=404, detail=f"Prompt {prompt_id} no encontrado")


@app.get("/api/v1/agents", response_model=list[Agent])
def get_agents():
    """Obtiene todos los agentes maestros."""
    return load_json("agentes_maestros.json")


@app.get("/api/v1/agents/{name}")
def get_agent(name: str):
    """Obtiene un agente específico por nombre."""
    agents = load_json("agentes_maestros.json")
    name_lower = name.lower()
    
    for a in agents:
        if name_lower in a.get("name", "").lower():
            return a
    
    raise HTTPException(status_code=404, detail=f"Agente {name} no encontrado")


@app.post("/api/v1/quote")
def create_quote(request: QuoteRequest) -> QuoteResponse:
    """
    Genera una proforma preliminar basada en los servicios solicitados.
    Nota: Esto es solo una estructura base. En producción, conectaría con el LLM.
    """
    services = load_json("service_matrix.json")
    pricing = load_json("pricing.json")
    
    items = []
    warnings = []
    total = 0.0
    
    for service_code in request.services:
        code_upper = service_code.upper()
        
        # Buscar servicio
        service = None
        for s in services:
            if s.get("service_code", "").upper() == code_upper:
                service = s
                break
        
        if not service:
            warnings.append(f"Servicio {service_code} no encontrado en catálogo")
            continue
        
        # Buscar pricing
        price_info = None
        for p in pricing:
            if p.get("service_code", "").upper() == code_upper:
                price_info = p
                break
        
        # Extraer precio base si existe
        unit_price = 0.0
        if price_info:
            # Buscar campos de precio comunes
            for key in ["price", "unit_price", "cost", "base_price", "pdp", "pvp"]:
                if key in price_info and price_info[key]:
                    try:
                        # Limpiar string y convertir
                        price_str = str(price_info[key]).replace("$", "").replace(",", "")
                        if price_str and price_str.lower() != "pendiente":
                            unit_price = float(price_str)
                            break
                    except ValueError:
                        continue
        
        if not price_info or unit_price == 0.0:
            warnings.append(f"Pricing no definido para {service_code}")
        
        item = {
            "service_code": code_upper,
            "service_name": service.get("service_name", ""),
            "unit": service.get("unit", ""),
            "unit_price": unit_price,
            "quantity": 1,
            "total": unit_price,
            "scope": service.get("scope_base", ""),
        }
        items.append(item)
        total += unit_price
    
    return QuoteResponse(
        client_name=request.client_name,
        items=items,
        subtotal=total,
        total=total,  # Sin impuestos por ahora
        warnings=warnings,
    )


@app.post("/api/v1/brief/validate")
def validate_brief(request: BriefRequest) -> BriefValidation:
    """
    Valida un brief según su tipo y retorna campos faltantes.
    """
    brief_templates = load_json("brief_templates.json")
    
    # Buscar template
    template = None
    for t in brief_templates:
        if t.get("brief_type", "").lower() == request.brief_type.lower():
            template = t
            break
    
    if not template:
        raise HTTPException(
            status_code=400,
            detail=f"Tipo de brief '{request.brief_type}' no reconocido. "
                   f"Tipos válidos: {[t['brief_type'] for t in brief_templates]}"
        )
    
    required_fields = template.get("fields", [])
    provided_data = request.data
    
    missing = []
    warnings = []
    
    for field in required_fields:
        if field not in provided_data or not provided_data[field]:
            missing.append(field)
    
    # Sugerencias de servicios basadas en el tipo de brief
    suggested = []
    if "audiovisual" in request.brief_type:
        suggested = ["AV-001", "AV-005"]
    elif "web" in request.brief_type or "desarrollo" in request.brief_type:
        suggested = ["DEV-001", "DEV-002"]
    elif "podcast" in request.brief_type:
        suggested = ["AV-010", "AV-011"]
    elif "funnel" in request.brief_type or "marketing" in request.brief_type:
        suggested = ["MK-002", "MK-004"]
    
    return BriefValidation(
        is_complete=len(missing) == 0,
        missing_fields=missing,
        warnings=warnings,
        suggested_services=suggested,
    )


@app.get("/api/v1/roles")
def get_roles():
    """Obtiene el mapa de roles del equipo."""
    return load_json("roles_map.json")


@app.get("/api/v1/workflow")
def get_workflow():
    """Obtiene el flujo comercial-operativo."""
    return load_json("workflow.json")


@app.get("/api/v1/knowledge-base")
def get_knowledge_base():
    """Obtiene la base de conocimiento comercial."""
    return load_json("knowledge_base.json")


@app.get("/health")
def health_check():
    """Health check para monitoreo."""
    return {"status": "ok", "service": "live-developer-api"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
