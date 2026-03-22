---
id: MAN-DEV-004
name: Estándares de Código
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: estandar
version: 1.0.0
related_services: ["DEV-001", "DEV-002", "DEV-003", "DEV-004", "DEV-005", "DEV-006", "DEV-007", "DEV-008", "DEV-009", "DEV-010"]
related_agents: ["CodeAuditor", "TechLeadFullStack"]
related_prompts: ["DEV-004"]
source_of_truth: true
tags: [codigo, estilo, linting, naming, solid]
legacy_id: MAN-DEV-004
migrated_from: base/masters/manuales-desarrollo/estandares_codigo.md
---

# Estándares de Código

## Resumen
Este manual establece las convenciones de estilo de código, herramientas de análisis estático (*linting*), estructura de archivos y mejores prácticas de documentación que todo el equipo de Live Developer debe seguir para garantizar la calidad y consistencia técnica en todos los proyectos.

---

## Sección 1: Estilos de Código por Lenguaje

### JavaScript / TypeScript
- **Indentación**: 2 espacios.
- **Longitud máxima de línea**: 100 caracteres.
- **Punto y coma**: Obligatorio.
- **Comillas**: Simples para cadenas de texto.

### Python
- **Indentación**: 4 espacios (PEP 8).
- **Longitud máxima de línea**: 88 caracteres (Black formatter).
- **Docstrings**: Google Style o NumPy Style.
- **Type hints**: Obligatorios para funciones públicas.

### CSS / SCSS
- **Indentación**: 2 espacios.
- **Nomenclatura**: kebab-case para nombres de clases.
- **Metodología**: BEM para la nomenclatura.

---

## Sección 2: Linters y Formateadores

### ESLint (JavaScript/TypeScript)
```json
{
  "extends": ["eslint:recommended", "@typescript-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

### Prettier
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100
}
```

---

## Sección 3: Convenciones de Nomenclatura

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Variables | camelCase | `userName` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Funciones | camelCase | `getUserData()` |
| Clases | PascalCase | `UserService` |
| Archivos | kebab-case | `user-service.ts` |
| Componentes React | PascalCase | `UserCard.tsx` |

---

## Sección 4: Buenas Prácticas Generales

### Principios SOLID
- **S (SRP)**: Responsabilidad Única.
- **O (OCP)**: Abierto/Cerrado.
- **L (LSP)**: Sustitución de Liskov.
- **I (ISP)**: Segregación de Interfaces.
- **D (DIP)**: Inversión de Dependencias.

### DRY (Don't Repeat Yourself)
Evitar la duplicación lógica centralizando el comportamiento.

### Gestión de Errores
- Implementar bloques try/catch en todas las operaciones asíncronas.
- Registrar sistemáticamente los errores en producción.
- Evitar la exposición de detalles técnicos internos.

---

## Checklist de Calidad Rápida

- [ ] Código procesado y validado por el linter.
- [ ] Nomenclatura descriptiva y alineada con convenciones.
- [ ] Funciones modulares (idealmente menores a 30 líneas).
- [ ] Documentación JSDoc o Docstrings presente.
- [ ] Ausencia de `console.log` para producción.
