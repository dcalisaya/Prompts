---
id: MAN-DEV-006
name: Seguridad de Código
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: tecnico
---

# Seguridad de Código

## Resumen
Este manual establece los estándares de seguridad que todo el equipo de Live Developer debe implementar para mitigar vulnerabilidades, proteger datos sensibles y garantizar la integridad de las aplicaciones desarrolladas.

---

## Sección 1: Mitigación del OWASP Top 10

### A01: Control de Acceso Roto (Broken Access Control)
**Riesgo:** Los usuarios acceden a recursos o funcionalidades fuera de sus permisos autorizados.

**Prevención:**
```javascript
// ✅ Validación estricta de autorización en cada endpoint
app.get('/api/orders/:id', authenticate, async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  // Validar que el recurso pertenece al usuario o este posee rol de administrador
  if (order.userId !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Acceso denegado.' });
  }
  
  res.json(order);
});
```

**Directrices clave:**
- Implementar la política de "denegar por defecto".
- Validar permisos exclusivamente en el servidor, nunca confiar en la lógica del cliente.

---

### A02: Fallos Criptográficos (Cryptographic Failures)
**Riesgo:** Exposición de datos sensibles por falta de cifrado o uso de algoritmos obsoletos.

**Prevención:**
- **Hashing de contraseñas**: Utilizar exclusivamente **bcrypt** (con al menos 12 rondas) o **Argon2**.
- **Cifrado en reposo**: Emplear **AES-256-GCM** para datos sensibles en la base de datos.
- **Tránsito seguro**: Uso obligatorio de **TLS 1.2+** mediante HTTPS forzado.

---

### A03: Inyección (Injection)
**Riesgo:** Los datos suministrados por el usuario son interpretados como comandos (SQL, NoSQL, OS).

**Prevención:**
- **SQL**: Utilizar siempre consultas parametrizadas o un ORM (como Prisma o SQLAlchemy).
- **NoSQL**: Sanitizar las entradas para evitar operadores lógicos inyectados en objetos de consulta.
- **Comandos**: Evitar el uso de funciones que ejecuten cadenas de texto directamente en el sistema operativo.

---

### A04: Diseño Inseguro (Insecure Design)
**Riesgo:** Deficiencias en la arquitectura y flujo de la aplicación que permiten ataques.

**Medidas preventivas:**
- Implementar limitación de tasa (*rate limiting*) en puntos críticos como el inicio de sesión.
- Validar límites y rangos en todos los parámetros de consulta.
- Utilizar tokens anti-CSRF en aplicaciones basadas en sesiones de navegador.

---

### A05: Configuración de Seguridad Incorrecta (Security Misconfiguration)
**Riesgo:** Uso de configuraciones por defecto, servicios innecesarios o encabezados de seguridad ausentes.

**Checklist técnica:**
- [ ] Implementar **Helmet.js** para configurar encabezados HTTP de seguridad (HSTS, CSP, etc.).
- [ ] Deshabilitar la divulgación de tecnología (ej. `x-powered-by`).
- [ ] Configurar políticas de **CORS** restringidas a orígenes explícitamente permitidos.

---

### A06: Componentes Vulnerables y Desactualizados
**Riesgo:** Uso de librerías o dependencias con vulnerabilidades conocidas.

**Gestión de dependencias:**
- Ejecutar `npm audit` sistemáticamente.
- Integrar herramientas de monitoreo como **Snyk** o **GitHub Dependabot**.
- Fijar versiones exactas de las librerías en entornos de producción.

---

### A07: Fallos de Identificación y Autenticación
**Riesgo:** Gestión deficiente de sesiones, contraseñas débiles o falta de MFA.

**Mejores prácticas:**
- **JWT**: Utilizar tiempos de expiración cortos (ej. 15 minutos) y mecanismos de *refresh tokens* seguros.
- **Cookies**: Configurar atributos `httpOnly`, `secure` y `sameSite: 'strict'`.
- **Contraseñas**: Implementar políticas de complejidad mínima mediante validación de esquemas (ej. Zod).

---

### A08: Fallos de Integridad de Software y Datos
**Riesgo:** Deserialización de datos no confiables o integridad de archivos comprometida.

**Prevención:**
- Evitar funciones peligrosas como `eval()` o la deserialización de objetos complejos de fuentes externas.
- Verificar la integridad de archivos críticos mediante firmas criptográficas (Hashes).

---

### A09: Fallos de Registro y Monitoreo de Seguridad
**Riesgo:** Falta de visibilidad ante ataques en curso o incidentes previos.

**Directrices de registro (Logging):**
- Registrar eventos críticos: fallos de autenticación, cambios de privilegios y accesos denegados.
- **Prohibición**: Nunca registrar contraseñas, tokens de acceso o datos personales sensibles (PII).

---

### A10: Falsificación de Solicitud del lado del Servidor (SSRF)
**Riesgo:** El servidor es inducido a realizar peticiones a recursos internos protegidos.

**Prevención:**
- Implementar listas blancas (*whitelists*) de dominios permitidos para peticiones externas.
- Validar y bloquear resoluciones de IP hacia rangos privados o locales (*localhost*).

---

## Sección 2: Gestión de Secretos (Secrets)

**Reglas de Oro:**
1. **Nunca** incluir secretos (claves de API, contraseñas) directamente en el código fuente.
2. Utilizar variables de entorno documentadas en un archivo `.env.example`.
3. Emplear gestores de secretos profesionales (AWS Secrets Manager, HashiCorp Vault) en entornos de producción.
4. Asegurar que los archivos de configuración local estén incluidos en el `.gitignore`.

---

## Sección 3: Validación y Sanitización

- **Validación**: Comprobar que los datos cumplen con el formato esperado antes de procesarlos (ej. usando Zod).
- **Sanitización**: Limpiar los datos para eliminar caracteres potencialmente peligrosos (especialmente para mitigar ataques XSS en la salida de datos).

---

## Checklist de Seguridad Pre-Despliegue

- [ ] ¿Se han parametrizado todas las consultas a la base de datos?
- [ ] ¿Se utiliza HTTPS/TLS en todas las comunicaciones?
- [ ] ¿Los encabezados de seguridad están configurados correctamente?
- [ ] ¿Se ha realizado un escaneo de vulnerabilidades en las dependencias?
- [ ] ¿Los secretos están fuera del sistema de control de versiones?
- [ ] ¿El registro de seguridad evita la exposición de datos sensibles?
