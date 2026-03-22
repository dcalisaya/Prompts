---
id: MAN-DEV-004
name: Estándares de Código
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: tecnico
---

# Estándares de Código

## Resumen
Este manual establece las convenciones de estilo de código, herramientas de análisis estático (*linting*), estructura de archivos y mejores prácticas de documentación que todo el equipo de Live Developer debe seguir para garantizar la calidad y consistencia técnica en todos los proyectos.

---

## Sección 1: Estilos de Código por Lenguaje

### JavaScript / TypeScript
- **Indentación**: 2 espacios (prohibido el uso de tabuladores).
- **Longitud máxima de línea**: 100 caracteres.
- **Punto y coma**: Obligatorio al finalizar cada sentencia.
- **Comillas**: Simples para cadenas de texto (`'string'`).
- **Literales de plantilla**: Utilizar para la interpolación de variables.

```javascript
// ✅ Correcto
const nombre = 'Juan';
const mensaje = `Hola, ${nombre}`;

// ❌ Incorrecto
var nombre = "Juan"
const mensaje = "Hola, " + nombre
```

### Python
- **Indentación**: 4 espacios (cumpliendo con PEP 8).
- **Longitud máxima de línea**: 88 caracteres (estándar de Black formatter).
- **Docstrings**: Utilizar el formato Google Style o NumPy Style.
- **Sugerencias de tipo (Type hints)**: Obligatorias para funciones públicas.

```python
# ✅ Correcto
def calcular_total(precio: float, cantidad: int) -> float:
    """Calcula el total multiplicando precio por cantidad.
    
    Args:
        precio: Precio unitario del producto.
        cantidad: Cantidad de productos.
        
    Returns:
        El total calculado.
    """
    return precio * cantidad

# ❌ Incorrecto
def calcular_total(precio, cantidad):
    return precio * cantidad
```

### CSS / SCSS
- **Indentación**: 2 espacios.
- **Nomenclatura**: kebab-case para nombres de clases (`.mi-clase`).
- **Orden de propiedades**: Alfabético o agrupado por lógica visual.
- **BEM**: Priorizar el uso de la metodología BEM para la nomenclatura.

```scss
// ✅ Correcto - Metodología BEM
.card {
  &__title { }
  &__content { }
  &--featured { }
}

// ❌ Incorrecto
.card { }
.cardTitle { }
.card_content { }
```

---

## Sección 2: Linters y Formateadores

### ESLint (JavaScript/TypeScript)
**Configuración recomendada para proyectos con React:**
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "react/prop-types": "off"
  }
}
```

**Comandos operativos:**
```bash
# Identificar errores de estilo y lógica
npm run lint

# Aplicar correcciones automáticas
npm run lint:fix
```

### Prettier
**Configuración estándar `.prettierrc`:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**Integración con pre-confirmación (pre-commit):**
```bash
# Configuración mediante husky y lint-staged
npm install --save-dev husky lint-staged
```

---

## Sección 3: Convenciones de Nomenclatura (Naming)

### Variables y Funciones
| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Variables | camelCase / snake_case | `userName`, `user_name` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_URL` |
| Funciones | camelCase / snake_case | `getUserData()`, `get_user_data()` |
| Clases | PascalCase | `UserService`, `ProductController` |
| Interfaces / Tipos | PascalCase con prefijo I / T | `IUser`, `TApiResponse` |
| Archivos | kebab-case | `user-service.ts`, `api-client.py` |
| Componentes React | PascalCase | `UserCard.tsx`, `ProductList.tsx` |

### Valores Booleanos
Utilizar prefijos interrogativos o de estado que identifiquen claramente el tipo de dato:
- `isLoading`, `hasError`, `canEdit`, `shouldUpdate`.

```javascript
// ✅ Correcto
const isActive = true;
const hasPermission = false;

// ❌ Incorrecto
const active = true;
const permission = false;
```

---

## Sección 4: Estructura de Archivos

### Frontend (React)
```
src/
├── components/           # Componentes reutilizables por el sistema
│   ├── common/          # Elementos base: botones, entradas, etc.
│   ├── layout/          # Estructuras globales: Header, Footer
│   └── features/        # Componentes acoplados a funcionalidades específicas
├── pages/               # Componentes que representan rutas completas
├── hooks/               # Ganchos personalizados (custom hooks)
├── services/            # Lógica de comunicación con APIs externas
├── utils/               # Funciones de utilidad general
├── types/               # Definiciones de tipos para TypeScript
├── constants/           # Valores constantes del sistema
└── styles/              # Definiciones de estilos globales
```

---

## Sección 5: Comentarios y Documentación

### Criterios de Comentario
- **Sí**: Explicar el "porqué" de una implementación, no el "qué".
- **Sí**: Documentar detalladamente las APIs públicas y contratos de interfaces.
- **Sí**: Aclarar decisiones técnicas complejas o no convencionales.
- **No**: Comentar fragmentos de código cuya lógica es evidente por sí misma.
- **No**: Mantener bloques de código comentado; el historial reside en Git.

```javascript
// ✅ Correcto - Explica la intención técnica
// Aplicamos un retraso para mitigar ráfagas de llamadas al evento resize
const debouncedResize = debounce(handleResize, 250);

// ❌ Incorrecto - Redundancia innecesaria
// Incrementa la variable contador en uno
counter += 1;
```

---

## Sección 6: Buenas Prácticas Generales

### Principios SOLID
- **S (SRP)**: Responsabilidad Única - Cada clase o función debe gestionar una sola tarea.
- **O (OCP)**: Abierto/Cerrado - Las entidades deben estar abiertas a la extensión, pero cerradas a la modificación.
- **L (LSP)**: Sustitución de Liskov - Las subclases deben ser intercambiables con sus clases base.
- **I (ISP)**: Segregación de Interfaces - Es preferible disponer de interfaces específicas que una generalista.
- **D (DIP)**: Inversión de Dependencias - Se debe depender de abstracciones, no de concreciones.

### DRY (Don't Repeat Yourself)
Evitar la duplicación lógica centralizando el comportamiento en funciones o componentes reutilizables.

### Gestión de Errores
- Implementar bloques try/catch en todas las operaciones asíncronas.
- Diseñar excepciones personalizadas para facilitar la depuración.
- Registrar sistemáticamente los errores en entornos de producción.
- Evitar la exposición de detalles técnicos internos al usuario final.

---

## Checklist de Calidad Rápida

- [ ] Código procesado y validado por el linter correspondiente.
- [ ] Nomenclatura descriptiva y alineada con las convenciones.
- [ ] Ausencia total de código muerto o comentado.
- [ ] Funciones modulares (idealmente menores a 30 líneas).
- [ ] Documentación JSDoc o Docstrings presente en interfaces públicas.
- [ ] Archivo README actualizado con las instrucciones del proyecto.
- [ ] Eliminación de sentencias `console.log` para producción.
- [ ] Cobertura de pruebas para las nuevas funcionalidades integradas.

---

## Recursos Adicionales

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Clean Code - Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Conventional Commits](https://www.conventionalcommits.org/)
