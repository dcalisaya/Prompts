# Configurar Knowledge en Open WebUI

Para que los modelos consulten documentos de base/masters automáticamente.

## Pasos

### 1. Crear Knowledge Collection

1. Abre http://localhost:3000
2. Ve a **Admin Panel** → **Knowledge** → **Create Collection**
3. Nombre: "Live Developer - Base de Conocimiento"

### 2. Subir documentos importantes

Click **Upload Files** y sube:

**Agentes:**
- `base/masters/agents/EstrategaDigital.md`
- `base/masters/agents/TechLeadFullStack.md`
- `base/masters/agents/ArquitectoSoftware.md`
- (todos los que uses)

**Servicios:**
- `base/masters/catalog/08-SERVICES.md`
- `base/masters/company/09-SERVICE-MATRIX.md`

**Prompts operativos:**
- `base/masters/prompts-operativos/04-Atencion-Comercial/COM-001*.md`
- `base/masters/prompts-operativos/04-Atencion-Comercial/COM-002*.md`
- `base/masters/prompts-operativos/05-Programacion/DEV-*.md`

### 3. Asignar a modelos

En cada modelo (agente) que crees:
1. **Admin Panel** → **Models** → [Tu Modelo] → **Edit**
2. En "Knowledge" selecciona la colección creada
3. Save

### 4. Usar en chat

Ahora cuando chatees con el agente, automáticamente consultará los documentos.

**Ejemplo:**
```
Usuario: "¿Qué servicios ofrecemos para podcast?"
Agente: [Consulta 08-SERVICES.md y responde con AV-010, AV-011, etc.]
```

## Limitaciones

- Máximo ~100MB de documentos por colección (aproximado)
- Los documentos se indexan una vez (no se actualizan automáticamente)
- Si modificas un archivo, debes re-subirlo

## Script de exportación

Para facilitar, puedes crear un ZIP con los documentos importantes:

```bash
cd /Users/dcalisaya/Developer/Prompts
mkdir -p export-knowledge

# Copiar agentes
cp base/masters/agents/*.md export-knowledge/

# Copiar servicios
cp base/masters/catalog/08-SERVICES.md export-knowledge/
cp base/masters/company/09-SERVICE-MATRIX.md export-knowledge/

# Copiar prompts importantes
cp base/masters/prompts-operativos/04-Atencion-Comercial/*.md export-knowledge/
cp base/masters/prompts-operativos/05-Programacion/*.md export-knowledge/

# Crear ZIP
cd export-knowledge
zip ../knowledge-base.zip *.md
cd ..
rm -rf export-knowledge

echo "Sube knowledge-base.zip a Open WebUI"
```
