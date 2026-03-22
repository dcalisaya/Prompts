#!/usr/bin/env python3
"""
Codex Bridge - Expone gpt-5.3-codex via HTTP API

Este servicio actúa como puente entre Open WebUI/LiteLLM y Codex CLI.
Como Codex CLI usa auth browser (no API key), este bridge debe correr
en la máquina donde Codex está autenticado (Mac Studio).

Uso:
    python3 app/codex-bridge/main.py
    
    # O con Docker
    docker run -p 5001:5001 -v ~/.codex:/root/.codex codex-bridge

Endpoints:
    POST /v1/chat/completions - Compatible con OpenAI API
    GET /health - Health check
    GET /models - Lista modelos disponibles

Requisitos:
    - Codex CLI instalado y autenticado (codex login)
    - Python 3.10+
"""

import asyncio
import json
import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from typing import AsyncGenerator

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel, Field

app = FastAPI(
    title="Codex Bridge",
    description="Bridge para usar gpt-5.3-codex via CLI con interfaz API",
    version="0.1.0",
)

# CORS para permitir conexiones desde Open WebUI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración
CODEX_CMD = os.environ.get("CODEX_CMD", "codex")
DEFAULT_MODEL = os.environ.get("CODEX_MODEL", "gpt-5.3-codex")
WORKING_DIR = Path(os.environ.get("CODEX_WORKING_DIR", "/tmp/codex-bridge"))
WORKING_DIR.mkdir(parents=True, exist_ok=True)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    model: str = Field(default=DEFAULT_MODEL)
    messages: list[Message]
    temperature: float | None = Field(default=None, ge=0, le=2)
    max_tokens: int | None = Field(default=None, ge=1)
    stream: bool = Field(default=False)
    # Campos adicionales para Codex
    approval_mode: str = Field(default="suggest", description="autoSuggest, suggest, or fullAuto")
    quiet: bool = Field(default=True)


class ChatResponse(BaseModel):
    id: str
    object: str = "chat.completion"
    created: int
    model: str
    choices: list[dict]
    usage: dict


def extract_code_from_messages(messages: list[Message]) -> tuple[str, str | None, list]:
    """
    Extrae el código/contexto y la instrucción de los mensajes.
    Codex CLI trabaja mejor con archivos reales, no chat.
    """
    # Concatenar todo el contexto
    full_context = "\n\n".join([f"{m.role}: {m.content}" for m in messages])
    
    # Buscar si hay código en bloques markdown
    code_blocks = []
    instruction = ""
    
    for msg in messages:
        content = msg.content
        # Extraer bloques de código
        if "```" in content:
            lines = content.split("\n")
            in_code = False
            current_code = []
            for line in lines:
                if line.startswith("```"):
                    if in_code:
                        code_blocks.append("\n".join(current_code))
                        current_code = []
                    in_code = not in_code
                elif in_code:
                    current_code.append(line)
        
        # La última instrucción del usuario
        if msg.role == "user":
            instruction = msg.content
    
    return full_context, instruction, code_blocks


def run_codex_cli(
    instruction: str,
    context: str | None = None,
    code_files: list[str] | None = None,
    model: str = DEFAULT_MODEL,
    approval_mode: str = "suggest"
) -> str:
    """
    Ejecuta Codex CLI y retorna la respuesta.
    
    Como Codex CLI está diseñado para trabajar con archivos,
    creamos archivos temporales para el contexto si es necesario.
    """
    # Construir comando base
    cmd = [
        CODEX_CMD,
        "--model", model,
        "--approval-mode", approval_mode,
    ]
    
    # Si hay archivos de código, usarlos directamente
    if code_files:
        cmd.extend(code_files)
        cmd.append("--")  # Separador
        cmd.append(instruction)
    else:
        # Crear archivo temporal con el contexto
        with tempfile.NamedTemporaryFile(
            mode='w', 
            suffix='.txt', 
            dir=WORKING_DIR,
            delete=False
        ) as f:
            if context:
                f.write(f"Contexto:\n{context}\n\n")
            f.write(f"Instrucción: {instruction}")
            temp_file = f.name
        
        cmd.append(temp_file)
    
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300,  # 5 minutos max
            cwd=WORKING_DIR
        )
        
        if result.returncode != 0:
            error_msg = result.stderr or "Error desconocido ejecutando Codex"
            raise RuntimeError(f"Codex CLI error: {error_msg}")
        
        return result.stdout
        
    except subprocess.TimeoutExpired:
        raise RuntimeError("Codex CLI timeout (>5 min)")
    except FileNotFoundError:
        raise RuntimeError(f"Codex CLI no encontrado: {CODEX_CMD}")
    finally:
        # Limpiar archivos temporales
        if 'temp_file' in locals():
            Path(temp_file).unlink(missing_ok=True)


@app.get("/health")
def health_check():
    """Verifica que Codex CLI está disponible."""
    try:
        result = subprocess.run(
            [CODEX_CMD, "--version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        return {
            "status": "ok",
            "codex_version": result.stdout.strip() if result.returncode == 0 else "unknown",
            "model": DEFAULT_MODEL
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Codex CLI no disponible: {e}")


@app.get("/v1/models")
def list_models():
    """Lista modelos disponibles via Codex."""
    return {
        "object": "list",
        "data": [
            {
                "id": "gpt-5.3-codex",
                "object": "model",
                "created": int(time.time()),
                "owned_by": "openai-codex"
            },
            {
                "id": "gpt-5.3-codex-high",
                "object": "model",
                "created": int(time.time()),
                "owned_by": "openai-codex"
            }
        ]
    }


@app.post("/v1/chat/completions")
async def chat_completion(request: ChatRequest):
    """
    Endpoint compatible con OpenAI API.
    Convierte el chat en llamada a Codex CLI.
    """
    try:
        # Extraer contexto e instrucción
        context, instruction, code_blocks = extract_code_from_messages(request.messages)
        
        # Mapear modelos
        model = request.model
        if model == "gpt-5.3-codex-high":
            # Algunos modelos pueden requerir flags adicionales
            pass
        
        # Ejecutar Codex
        output = run_codex_cli(
            instruction=instruction,
            context=context if not code_blocks else None,
            code_files=None,  # Podríamos extraer y guardar bloques como archivos
            model=model,
            approval_mode="suggest" if request.temperature and request.temperature > 0.5 else "autoSuggest"
        )
        
        # Construir respuesta compatible con OpenAI
        response = ChatResponse(
            id=f"codex-{int(time.time())}",
            created=int(time.time()),
            model=request.model,
            choices=[{
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": output
                },
                "finish_reason": "stop"
            }],
            usage={
                "prompt_tokens": len(context) // 4,  # Estimación
                "completion_tokens": len(output) // 4,
                "total_tokens": (len(context) + len(output)) // 4
            }
        )
        
        if request.stream:
            # Streaming no soportado nativamente por Codex CLI
            # Simulamos streaming palabra por palabra
            async def generate():
                words = output.split()
                for i, word in enumerate(words):
                    chunk = {
                        "id": response.id,
                        "object": "chat.completion.chunk",
                        "created": response.created,
                        "model": request.model,
                        "choices": [{
                            "index": 0,
                            "delta": {"content": word + " "},
                            "finish_reason": None if i < len(words) - 1 else "stop"
                        }]
                    }
                    yield f"data: {json.dumps(chunk)}\n\n"
                    await asyncio.sleep(0.01)  # Simular velocidad
                yield "data: [DONE]\n\n"
            
            return StreamingResponse(generate(), media_type="text/event-stream")
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/v1/codex/review")
def codex_review(file_path: str, instructions: str | None = None):
    """
    Endpoint especializado para code review.
    Más directo que el chat completion.
    """
    if not Path(file_path).exists():
        raise HTTPException(status_code=404, detail=f"Archivo no encontrado: {file_path}")
    
    try:
        cmd = [
            CODEX_CMD,
            "--model", DEFAULT_MODEL,
            "--approval-mode", "suggest",
            file_path
        ]
        
        if instructions:
            cmd.extend(["--", instructions])
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
        
        return {
            "file": file_path,
            "review": result.stdout,
            "errors": result.stderr if result.returncode != 0 else None
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    
    # Verificar que Codex está instalado
    try:
        subprocess.run([CODEX_CMD, "--version"], capture_output=True, check=True)
        print(f"✅ Codex Bridge iniciado")
        print(f"   Modelo: {DEFAULT_MODEL}")
        print(f"   URL: http://localhost:5001")
        print(f"   Health: http://localhost:5001/health")
    except Exception as e:
        print(f"❌ Error: Codex CLI no encontrado o no autenticado")
        print(f"   Asegúrate de ejecutar: codex login")
        sys.exit(1)
    
    uvicorn.run(app, host="0.0.0.0", port=5001)
