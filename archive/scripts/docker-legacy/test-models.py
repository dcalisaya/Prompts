#!/usr/bin/env python3
"""
Script de prueba para modelos de Ollama
Verifica que todos los modelos respondan correctamente

Uso:
    python3 scripts/test-models.py

Requisitos:
    - Ollama corriendo
"""

import subprocess
import sys
import time

# Configuración
OLLAMA_URL = "http://localhost:11434"
TEST_PROMPT = "Responde en español: ¿Qué es Live Developer? Responde en una oración."

# Detectar modelos instalados automáticamente
MODELOS_INSTALADOS = []


def verificar_ollama():
    """Verifica que Ollama está corriendo"""
    try:
        import urllib.request
        req = urllib.request.Request(f"{OLLAMA_URL}/api/tags")
        with urllib.request.urlopen(req, timeout=5) as response:
            return True
    except Exception as e:
        print(f"❌ Ollama no responde: {e}")
        print("   Asegúrate de ejecutar: ollama serve")
        return False


def listar_modelos_instalados():
    """Lista modelos instalados en Ollama"""
    try:
        import json
        import urllib.request
        
        req = urllib.request.Request(f"{OLLAMA_URL}/api/tags")
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            modelos = [m["name"] for m in data.get("models", [])]
            return modelos
    except Exception as e:
        print(f"❌ Error listando modelos: {e}")
        return []


def probar_modelo(nombre_modelo):
    """Prueba un modelo específico"""
    import json
    import urllib.request
    
    print(f"\n🔄 Probando {nombre_modelo}...")
    
    payload = {
        "model": nombre_modelo,
        "prompt": TEST_PROMPT,
        "stream": False,
        "options": {
            "temperature": 0.7,
            "num_predict": 100
        }
    }
    
    try:
        inicio = time.time()
        
        req = urllib.request.Request(
            f"{OLLAMA_URL}/api/generate",
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        
        with urllib.request.urlopen(req, timeout=120) as response:
            data = json.loads(response.read().decode())
            
        tiempo = time.time() - inicio
        respuesta = data.get("response", "[Sin respuesta]").strip()
        
        return {
            "modelo": nombre_modelo,
            "ok": True,
            "tiempo": tiempo,
            "respuesta": respuesta[:100] + "..." if len(respuesta) > 100 else respuesta,
            "tokens": data.get("eval_count", 0)
        }
        
    except Exception as e:
        return {
            "modelo": nombre_modelo,
            "ok": False,
            "error": str(e)
        }


def main():
    """Función principal"""
    print("=" * 70)
    print("🧪 TEST DE MODELOS OLLAMA")
    print("=" * 70)
    
    # Verificar Ollama
    print("\n📡 Verificando Ollama...")
    if not verificar_ollama():
        sys.exit(1)
    print("✅ Ollama responde correctamente")
    
    # Listar modelos instalados
    print("\n📦 Modelos instalados:")
    instalados = listar_modelos_instalados()
    for m in instalados:
        print(f"   • {m}")
    
    if not instalados:
        print("   ⚠️  No hay modelos instalados")
        print("   Instala con: ollama pull llama3.1:8b")
        sys.exit(1)
    
    # Probar modelos
    print("\n" + "=" * 70)
    print("🚀 INICIANDO PRUEBAS")
    print("=" * 70)
    
    resultados = []
    
    # Probar cada modelo
    for modelo in instalados:
        resultado = probar_modelo(modelo)
        resultados.append(resultado)
        
        if resultado["ok"]:
            print(f"✅ {resultado['modelo']}: {resultado['tiempo']:.1f}s ({resultado['tokens']} tokens)")
            print(f"   📝 {resultado['respuesta']}")
        else:
            print(f"❌ {resultado['modelo']}: {resultado['error']}")
    
    # Resumen
    print("\n" + "=" * 70)
    print("📊 RESUMEN")
    print("=" * 70)
    
    exitosos = [r for r in resultados if r["ok"]]
    fallidos = [r for r in resultados if not r["ok"]]
    
    print(f"\n✅ Exitosos: {len(exitosos)}/{len(resultados)}")
    print(f"❌ Fallidos: {len(fallidos)}/{len(resultados)}")
    
    if exitosos:
        print("\n⚡ Velocidades (ordenadas):")
        for r in sorted(exitosos, key=lambda x: x["tiempo"]):
            print(f"   {r['modelo']:25} {r['tiempo']:6.1f}s ({r.get('tokens', 0)} tokens)")
        
        mas_rapido = min(exitosos, key=lambda x: x["tiempo"])
        print(f"\n🏃 Más rápido: {mas_rapido['modelo']} ({mas_rapido['tiempo']:.1f}s)")
    
    if fallidos:
        print("\n⚠️  Errores:")
        for r in fallidos:
            print(f"   {r['modelo']}: {r['error']}")
    
    print("\n" + "=" * 70)
    
    return len(fallidos) == 0


if __name__ == "__main__":
    import urllib.request
    import json
    
    exito = main()
    sys.exit(0 if exito else 1)
