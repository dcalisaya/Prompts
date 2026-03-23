# UI Design System: Web Institucional Live Developer

**Objetivo del documento:** Establecer los tokens visuales base y la estructura de componentes para la interfaz de usuario, alineados con la arquitectura definida para este proyecto (`Astro + React islands`) y soportando esquemas Dark/Light.

## 1. Tokens de Diseño

La interfaz utilizará clases utilitarias de Tailwind CSS mapeadas a las siguientes variables CSS globales dentro de `projects/web-live-developer/site/`.

### Paleta de Colores
| Uso | Dark Mode (Default) | Light Mode |
| :--- | :--- | :--- |
| **Fondo Base** | `#272223` | `#F8F9FA` |
| **Fondo Superficie (Cards)** | `#2D2829` | `#FFFFFF` |
| **Texto Principal** | `#FFFFFF` | `#1A1A1A` |
| **Texto Secundario** | `#A0A0A0` | `#666666` |
| **Primario (Tecnología)** | `#3CB8F2` | `#256FA8` |
| **Acento (Creatividad)**| `#FFB03A` | `#E69526` |
| **Bordes** | `#3D3839` | `#E0E0E0` |

### Tipografía
- **Títulos (H1-H6):** `Outfit`, sans-serif.
- **Cuerpo de texto:** `Instrument Sans`, sans-serif.

## 2. Implementación en Astro + React + Tailwind

Dado que la implementación de este proyecto vivirá en `projects/web-live-developer/site/`, la configuración del tema de Tailwind se debe extender en la configuración del proyecto Astro:

```javascript
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        content: 'var(--text-main)',
        muted: 'var(--text-muted)',
        border: 'var(--border-color)'
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
      }
    }
  }
}
```

## 3. Patrones de UI
- **Dualidad Visual:** Las secciones de contenido "Tecnológico" utilizarán sutiles acentos del color Primario, mientras que las secciones "Creativas" utilizarán el color Acento. Esto aplica a íconos, bordes de hover y CTAs.
- **Componente de Tarjeta de Servicio:** Deberá renderizar el `service_code` (ej. DEV-001) y el `scope_base` derivado del JSON canónico.

## Acción Requerida
- Instalar y configurar Tailwind CSS dentro de `projects/web-live-developer/site/`.
- Cargar las fuentes (Outfit, Instrument Sans) en el layout base del proyecto Astro.
