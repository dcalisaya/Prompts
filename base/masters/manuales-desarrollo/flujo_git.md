---
id: MAN-DEV-005
name: Flujo de Trabajo Git
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: tecnico
---

# Flujo de Trabajo Git

## Resumen
Este manual define las estrategias de ramificación (*branching*), las convenciones para las confirmaciones (*commits*), el proceso de revisión de código (*code review*) y el flujo de lanzamientos (*releases*) que el equipo de Live Developer emplea para garantizar un historial de cambios íntegro y una colaboración eficiente.

---

## Sección 1: Estrategia de Ramificación (Branching Strategy)

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
- `main`: Contiene el código en producción; solo admite fusiones (*merges*) de ramas de `release` y `hotfix`.
- `develop`: Rama principal de integración para el desarrollo diario.
- `feature/*`: Desarrollo de nuevas funcionalidades (ej: `feature/user-auth`).
- `release/*`: Preparación y estabilización de un nuevo lanzamiento (ej: `release/v1.2.0`).
- `hotfix/*`: Correcciones críticas y urgentes directamente para el entorno de producción.

### Trunk-Based Development (Proyectos con CI/CD continuo)
```
main    ●────●────●────●────●────●────●
         \  /      \  /      \  /
feature   ●●        ●●        ●●
          (PR)      (PR)      (PR)
```

- El equipo trabaja directamente sobre `main` o en ramas de corta duración (menos de 24 horas).
- Uso estricto de banderas de funcionalidad (*feature flags*) para código incompleto.
- Fomenta múltiples despliegues diarios.

---

## Sección 2: Convenciones de Confirmación (Commits)

### Conventional Commits
Seguimos el estándar de mensajes estructurados para facilitar la legibilidad y la automatización:
```
<tipo>(<alcance opcional>): <descripción>

<cuerpo opcional>

<footer opcional>
```

**Tipos de confirmación:**
| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad para el usuario. | `feat(auth): add OAuth2 login` |
| `fix` | Corrección de un error (*bug*). | `fix(api): handle null response` |
| `docs` | Cambios exclusivos en la documentación. | `docs(readme): update setup` |
| `style` | Cambios de formato (espacios, comas) sin afectar la lógica. | `style: fix indentation` |
| `refactor` | Cambio de código que no corrige errores ni añade funciones. | `refactor: simplify logic` |
| `perf` | Cambio de código destinado a mejorar el rendimiento. | `perf(db): add user index` |
| `test` | Adición o corrección de pruebas. | `test(auth): add unit tests` |
| `chore` | Tareas de mantenimiento o actualización de dependencias. | `chore(deps): update v1.2.0` |

### Reglas para los Mensajes
- Utilizar el modo imperativo: "add" en lugar de "added", "fix" en lugar de "fixed".
- La descripción debe comenzar en minúscula.
- No finalizar el título con punto.
- Mantener el título por debajo de los 50 caracteres.
- Separar el título del cuerpo con una línea en blanco.

---

## Sección 3: Pull Requests (PR)

### Requisitos previos a la creación de un PR
- [ ] El código ha sido validado en el entorno local.
- [ ] Todas las pruebas unitarias y de integración son satisfactorias.
- [ ] No existen errores detectados por el linter.
- [ ] La rama se encuentra actualizada respecto a su base (`develop` o `main`).

### Proceso de Revisión
1. **Autor**: Asigna al menos dos revisores y responde a los comentarios de forma proactiva.
2. **Revisor**: Debe responder en un plazo máximo de 24 horas laborables, distinguiendo entre sugerencias estéticas y cambios bloqueantes.
3. **Etiquetas de revisión**:
   - `nit:` Sugerencia menor, no impide la fusión.
   - `blocking:` El cambio es obligatorio antes de aprobar el PR.

---

## Sección 4: Revisión de Código (Code Review)

### Aspectos críticos a evaluar
- **Lógica**: ¿La implementación resuelve el problema de forma eficiente?
- **Seguridad**: ¿Existen vulnerabilidades potenciales (ej. inyecciones, falta de validación)?
- **Estándares**: ¿Se respeta la nomenclatura y los patrones del proyecto?
- **Pruebas**: ¿La cobertura de tests es adecuada para el nuevo código?

---

## Sección 5: Versionado Semántico (SemVer)

Seguimos el formato `MAJOR.MINOR.PATCH`:
- **MAJOR**: Cambios disruptivos que rompen la compatibilidad con versiones anteriores.
- **MINOR**: Incorporación de nuevas funcionalidades manteniendo la compatibilidad.
- **PATCH**: Correcciones de errores que mantienen la compatibilidad.

---

## Sección 6: Flujo de Lanzamiento (Release)

### Pasos para un Lanzamiento (GitFlow)
1. **Creación**: Se crea la rama `release/vX.X.X` desde `develop`.
2. **Estabilización**: Se ejecutan pruebas finales y se aplican correcciones exclusivas del lanzamiento.
3. **Incremento de versión (*Version Bump*)**: Se actualizan los metadatos de versión y el archivo `CHANGELOG.md`.
4. **Fusión y Etiquetado**:
   - Se fusiona en `main` y se crea una etiqueta (*tag*) anotada con la versión.
   - Se fusiona de vuelta en `develop` para integrar las correcciones finales.
5. **Limpieza**: Se elimina la rama de `release` local y remota.

---

## Sección 7: Configuración de Git

### Alias recomendados para productividad
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --decorate"
```

---

## Checklist de Finalización

- [ ] Mensaje de confirmación alineado con Conventional Commits.
- [ ] Rama actualizada y libre de conflictos de fusión.
- [ ] Pruebas superadas y revisión de código completada.
- [ ] Archivo `CHANGELOG.md` y versión actualizados.
- [ ] Etiqueta de versión creada y enviada al repositorio remoto.
