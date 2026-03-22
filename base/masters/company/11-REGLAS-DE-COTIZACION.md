# Reglas de Cotizacion y Proformas

Este documento define como convertir una necesidad del cliente en una proforma o cotizacion sin inventar alcance, precio ni tiempos.

## Principios

- se cotiza por servicios existentes,
- el alcance debe escribirse en lenguaje claro,
- cada linea de proforma debe tener unidad logica,
- toda ambiguedad debe quedar marcada antes de emitir valor final,
- la propuesta no debe vender algo que operacion no puede cumplir.

## Flujo minimo de cotizacion

1. recibir requerimiento,
2. clasificar por area,
3. mapear servicios con `service_code`,
4. detectar vacios,
5. definir alcance base y exclusiones,
6. validar pricing,
7. emitir proforma o propuesta.

## Reglas de armado

- usar `service_code` exacto desde [09-SERVICE-MATRIX.md](/Users/dcalisaya/Developer/Prompts/base/masters/company/09-SERVICE-MATRIX.md) como referencia canónica,
- el nombre comercial puede presentarse en versión legible para humanos, pero no debe romper la relación con su `service_code`,
- si un requerimiento mezcla varias piezas, cotizar varias lineas,
- si hay produccion y pauta, separar ambas,
- si hay diseno y luego impresion, dejarlo claro como servicios distintos si aplica,
- si un cliente pide algo no estandar, marcarlo como especial y elevar revision.

## Estructura minima de una proforma

1. datos del cliente,
2. resumen del requerimiento,
3. servicios cotizados,
4. alcance base por servicio,
5. exclusiones o no incluidos,
6. supuestos del proyecto,
7. informacion faltante,
8. valor,
9. condiciones comerciales.

## Reglas de alcance

- `scope_base` debe ser corto, concreto y verificable.
- `not_included` debe explicitar limites.
- si hay revisiones incluidas, deben contarse.
- si no se definio cantidad de piezas, no debe prometerse volumen.
- si no se definio locacion, no debe cerrarse logistica.

## Reglas de tiempos

- no prometer fechas cerradas sin brief aprobado y disponibilidad interna.
- usar lenguaje como `tiempo estimado sujeto a aprobacion de brief`.
- urgencias deben cotizarse con recargo o validacion previa.

## Reglas por tipo de servicio

### Audiovisual
- separar grabacion, edicion, verticales, subtitulos, locucion y pauta si no estan expresamente incluidos.
- aclarar cantidad de jornadas y numero de piezas.

### Marketing mensual
- separar estrategia, community management y pauta.
- aclarar si el presupuesto de medios esta incluido o no.

### Desarrollo
- separar discovery, implementacion, integraciones, hosting y mantenimiento cuando corresponda.
- no prometer funcionalidades que no esten definidas.

### IA y automatizacion
- definir proceso objetivo, entradas, salidas, canal y limite de integraciones.
- aclarar si entrenamiento, soporte y ajustes posteriores estan incluidos.

## Semaforo de riesgo antes de cotizar

- `Verde`: requerimiento claro, servicio estandar, pricing definido.
- `Amarillo`: alcance parcialmente claro, faltan insumos o definiciones.
- `Rojo`: servicio no estandar, pricing no definido o alta incertidumbre.

## Regla final

Si el proyecto esta en `Amarillo` o `Rojo`, la proforma debe salir con observaciones y no debe presentarse como alcance cerrado.
