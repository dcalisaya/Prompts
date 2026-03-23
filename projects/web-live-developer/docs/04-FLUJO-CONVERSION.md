# Flujo de Conversión: Web Institucional Live Developer

**Objetivo del documento:** Mapear el recorrido técnico y de experiencia del usuario hacia la conversión (Lead), asegurando la trazabilidad de los datos según las prácticas de Live Developer.

## 1. Captura de Intención (Top of Funnel)
- **Origen:** Tráfico orgánico, directo o pauta (`MK-004`).
- **Comportamiento en Home:** El usuario selecciona el área de interés (Tecnología o Creatividad).
- **Mecanismo:** La aplicación React enruta al usuario a `/tecnologia` o `/creatividad`.

## 2. Exploración de Servicios (Middle of Funnel)
- El usuario navega por las categorías oficiales (ej. `Desarrollo de Software y Apps`).
- Visualiza tarjetas con el alcance base (`scope_base`) y el resumen del servicio.
- Los CTAs en estas páginas son contextuales: "Consultar por [Nombre del Servicio]".

## 3. Formulario de Captación (Bottom of Funnel)
- Formulario de contacto integrado en el frontend (React Hook Form + Zod recomendado).
- **Campos mínimos requeridos (alineado con Briefs Comerciales):**
  - Nombre / Empresa
  - Correo Corporativo
  - Necesidad Principal
  - Categoría de Interés (Auto-completado por el estado de navegación de React Router).
- **Rastro Operativo:**
  - Al enviar el formulario, los parámetros UTM (capturados vía `DAT-005`) y la categoría de interés se adjuntan al payload de la API.
  - La petición se envía al backend o webhook para su ingreso al CRM interno (`CX-002`).

## 4. Respuesta y Seguimiento
- Redirección a una vista de "Gracias" (`/gracias`) para correcta medición del evento de conversión en GA4.
- Envío automático de correo de confirmación al cliente (Copy bilingüe según `COPY-004`).

## Acción Requerida
- Definir el endpoint (API o Webhook) exacto que recibirá el payload del formulario de contacto.
