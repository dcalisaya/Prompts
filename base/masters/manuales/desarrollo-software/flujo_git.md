---
id: MAN-DEV-005
name: Flujo de Trabajo Git
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: estandar
version: 1.0.0
related_services: ["DEV-001", "DEV-002", "DEV-003", "DEV-004", "DEV-005", "DEV-006", "DEV-007", "DEV-008", "DEV-009", "DEV-010"]
related_agents: ["TechLeadFullStack", "CodeAuditor"]
related_prompts: []
source_of_truth: true
tags: [git, branching, commits, pull-requests, semver]
legacy_id: MAN-DEV-005
migrated_from: base/masters/manuales-desarrollo/flujo_git.md
---

# Flujo de Trabajo Git

## Resumen
Este manual define las estrategias de ramificación (*branching*), las convenciones para las confirmaciones (*commits*), el proceso de revisión de código (*code review*) y el flujo de lanzamientos (*releases*) que el equipo de Live Developer emplea para garantizar un historial de cambios íntegro y una colaboración eficiente.

---

## Sección 1: Estrategia de Ramificación

### GitFlow (Proyectos con lanzamientos programados)
```
main        ●────────────────●────────────────●
              │                │                │
hotfix      │   ●────────●   │                │
            │  /         \  │                │
release     │ ●───────────● │                │
          / │/              │\               │
develop ●───●───────────────●────────────────●
        \ /                 │
feature   ●────●────●        │
```

**Ramas principales:**
- `main`: Código en producción.
- `develop`: Integración para desarrollo diario.
- `feature/*`: Desarrollo de nuevas funcionalidades.
- `release/*`: Preparación de un nuevo lanzamiento.
- `hotfix/*`: Correcciones urgentes para producción.

---

## Sección 2: Convenciones de Confirmación (Commits)

### Conventional Commits
```
<tipo>(<alcance opcional>): <descripción>
```

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(auth): add OAuth2 login` |
| `fix` | Corrección de error | `fix(api): handle null response` |
| `docs` | Documentación | `docs(readme): update setup` |
| `refactor` | Refactorización | `refactor: simplify logic` |
| `test` | Pruebas | `test(auth): add unit tests` |
| `chore` | Mantenimiento | `chore(deps): update v1.2.0` |

**Reglas:**
- Usar modo imperativo: "add" no "added".
- Título por debajo de 50 caracteres.
- Sin punto final en el título.

---

## Sección 3: Pull Requests

### Requisitos previos
- [ ] Código validado en entorno local.
- [ ] Todas las pruebas satisfactorias.
- [ ] Sin errores del linter.
- [ ] Rama actualizada respecto a su base.

### Proceso de Revisión
1. **Autor**: Asigna al menos dos revisores.
2. **Revisor**: Responde en máximo 24 horas laborables.
3. **Etiquetas**: `nit:` (sugerencia menor), `blocking:` (cambio obligatorio).

---

## Sección 4: Versionado Semántico (SemVer)

- **MAJOR**: Cambios disruptivos.
- **MINOR**: Nuevas funcionalidades compatibles.
- **PATCH**: Correcciones compatibles.

---

## Checklist de Finalización

- [ ] Mensaje de confirmación alineado con Conventional Commits.
- [ ] Rama actualizada y libre de conflictos.
- [ ] Pruebas superadas y revisión completada.
- [ ] Archivo `CHANGELOG.md` y versión actualizados.
