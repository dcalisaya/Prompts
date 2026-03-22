---
id: MAN-DEV-006
name: Seguridad de Código
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: estandar
version: 1.0.0
related_services: ["DEV-001", "DEV-002", "DEV-003", "DEV-004", "DEV-005", "DEV-006", "DEV-007", "DEV-008", "DEV-009", "DEV-010"]
related_agents: ["CodeAuditor", "DevOpsEngineer"]
related_prompts: ["DEV-004"]
source_of_truth: true
tags: [seguridad, owasp, injection, auth, secrets]
legacy_id: MAN-DEV-006
migrated_from: base/masters/manuales-desarrollo/seguridad_codigo.md
---

# Seguridad de Código

## Resumen
Este manual establece los estándares de seguridad que todo el equipo de Live Developer debe implementar para mitigar vulnerabilidades, proteger datos sensibles y garantizar la integridad de las aplicaciones desarrolladas.

---

## Sección 1: Mitigación del OWASP Top 10

### A01: Control de Acceso Roto
**Prevención:**
```javascript
app.get('/api/orders/:id', authenticate, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order.userId !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Acceso denegado.' });
  }
  res.json(order);
});
```

### A02: Fallos Criptográficos
- **Hashing de contraseñas**: bcrypt (mínimo 12 rondas) o Argon2.
- **Cifrado en reposo**: AES-256-GCM.
- **Tránsito seguro**: TLS 1.2+ mediante HTTPS.

### A03: Inyección
- **SQL**: Consultas parametrizadas u ORM (Prisma, SQLAlchemy).
- **NoSQL**: Sanitizar entradas para operadores lógicos inyectados.
- **Comandos**: Evitar `eval()` o ejecución de cadenas en sistema operativo.

### A07: Fallos de Identificación y Autenticación
- **JWT**: Tiempos de expiración cortos (ej. 15 minutos).
- **Cookies**: Atributos `httpOnly`, `secure` y `sameSite: 'strict'`.
- **Contraseñas**: Políticas de complejidad mínima.

---

## Sección 2: Gestión de Secretos

1. **Nunca** incluir secretos en el código fuente.
2. Utilizar variables de entorno documentadas en `.env.example`.
3. Emplear gestores de secretos (AWS Secrets Manager, HashiCorp Vault).
4. Archivos de configuración local en `.gitignore`.

---

## Sección 3: Validación y Sanitización

- **Validación**: Comprobar que los datos cumplen el formato esperado (Zod).
- **Sanitización**: Limpiar datos para eliminar caracteres peligrosos.

---

## Checklist de Seguridad Pre-Despliegue

- [ ] ¿Se han parametrizado todas las consultas a la base de datos?
- [ ] ¿Se utiliza HTTPS/TLS en todas las comunicaciones?
- [ ] ¿Los secretos están fuera del control de versiones?
- [ ] ¿Se ha realizado un escaneo de vulnerabilidades en las dependencias?
- [ ] ¿El registro de seguridad evita la exposición de datos sensibles?
