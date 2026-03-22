---
id: DEV-008
name: Generador de Tests
category: Desarrollo de Software y Apps
agent_core: QATester
source_of_truth:
- manuales-desarrollo/estandares_codigo.md
- manuales-desarrollo/seguridad_codigo.md
- manuales-desarrollo/arquitectura_base.md
version: 1.0.0
discipline: Desarrollo de Software
related_services:
- DEV-001
- DEV-002
- DEV-003
- DEV-004
- DEV-005
- DEV-006
stage: engineering
input_type: requerimiento funcional o tecnico
deliverable_type: especificacion, arquitectura, estimacion, codigo o testing
---

# DEV-008: Generador de Tests

**Objetivo:** Generar suites de tests completas (unitarios, integración, E2E) para código existente, incluyendo casos edge, mocks apropiados, cobertura objetivo, y siguiendo patrones AAA o Given-When-Then.

**Descripción:** Este prompt crea tests exhaustivos que validan comportamiento esperado y manejo de errores. Genera tests unitarios para lógica pura, tests de integración para interacciones entre componentes, y tests E2E para flujos críticos, asegurando cobertura de casos edge y uso correcto de mocks/stubs.

## Contexto para el Usuario
Utiliza este prompt cuando necesites escribir tests para código nuevo, aumentar cobertura de código existente, o crear tests de regresión tras encontrar bugs. Es esencial para mantener calidad en refactorizaciones y evitar regresiones.

## Cuando usar este prompt
- Nuevo código necesita tests antes de merge
- Aumentar cobertura de módulo existente
- Tests de regresión tras bug encontrado
- Refactorización que requiere safety net
- Documentar comportamiento de código legacy

## Input necesario
**Código a testear:** Implementación funcional + requisitos/contracto + dependencias externas + casos edge conocidos.

## Output esperado
Suite de tests completa: tests unitarios (lógica pura), integración (con dependencias mockeadas/reales), E2E (flujos críticos), cobertura estimada, y documentación de estrategia de testing.

## Prompt

```
Actúa como un QA Engineer Senior especializado en testing automatizado. Tu objetivo es generar una suite de tests completa y robusta para el siguiente código.

## CÓDIGO A TESTEAR (Input)
[COPIAR AQUÍ EL CÓDIGO/FUNCIÓN/MÓDULO]

---

## CONTEXTO DEL CÓDIGO

### Contrato/Interfaz
- **Inputs esperados:** [Tipos, rangos, formatos válidos]
- **Outputs esperados:** [Tipos, formatos, garantías]
- **Side effects:** [Qué modifica: BD, archivos, APIs externas]
- **Errores esperados:** [Excepciones/códigos de error que puede lanzar]
- **Invariantes:** [Condiciones que siempre deben cumplirse]

### Dependencias Externas
| Dependencia | Tipo | Mock? | Notas |
|-------------|------|-------|-------|
| [BD/ORM] | Database | Sí/No | [Notas] |
| [API Externa] | HTTP Client | Sí | [Rate limits, etc.] |
| [File System] | I/O | Sí | [Mock in-memory] |
| [Cache] | Redis/Memcached | Sí/No | |
| [Queue] | Message Queue | Sí | |

### Casos Edge Identificados
- [Caso edge 1: input vacío, null, extremadamente grande]
- [Caso edge 2: race condition posible]
- [Caso edge 3: límite de recursos]

### Casos de Error Conocidos
- [Error 1: invalid input]
- [Error 2: recurso no encontrado]
- [Error 3: timeout/dependencia caída]

### Framework de Testing
- **Lenguaje:** [Python/JS/Java/etc.]
- **Framework:** [pytest/Jest/JUnit/etc.]
- **Mocking:** [unittest.mock/sinon/mockito/etc.]
- **Cobertura objetivo:** [X]%

---

## ESTRATEGIA DE TESTING

### Pirámide de Tests
```
    /\
   /  \  E2E (pocos, flujos críticos)
  /____\
 /      \  Integración (servicios, BD)
/________\
           Unit (muchos, rápidos, aislados)
```

### Niveles de Testing a Generar
1. **Unitarios:** Lógica pura, sin dependencias externas
2. **Integración:** Con BD/cache reales o test containers
3. **Contract:** APIs externas mockeadas con expectativas
4. **E2E:** Flujo completo del usuario (si aplica)

---

## TESTS UNITARIOS

### Estructura del Test (Patrón AAA)
```[lenguaje]
// Arrange: Setup inicial, mocks, datos de prueba
// Act: Ejecución del código bajo test
// Assert: Verificación de resultados
```

### Tests de Caso Feliz

**Test 1: [Descripción del escenario]**
```python/pytest
# test_descriptive_name.py
def test_[nombre_descriptivo_del_escenario]():
    # Arrange
    input_data = [dato válido representativo]
    expected_output = [resultado esperado]
    
    # Act
    result = funcion_bajo_test(input_data)
    
    # Assert
    assert result == expected_output
    # O para objetos complejos:
    assert result.field == expected_value
    assert result.status == "success"
```

**Test 2: [Otro caso feliz relevante]**
```
[Código de test]
```

### Tests de Casos Edge

**Test: Input vacío/null**
```
[Código de test con input vacío, null, o valor mínimo]
```

**Test: Input límite máximo**
```
[Código de test con valores máximos, overflow potencial]
```

**Test: Input con caracteres especiales/encoding**
```
[Código de test con unicode, emojis, SQL injection attempts]
```

**Test: Concurrencia/Race condition**
```
[Código de test que simula acceso concurrente si aplica]
```

### Tests de Error Handling

**Test: [Tipo de error 1 - ej: Input inválido]**
```python/pytest
def test_[nombre]_raises_error_when_[condicion]():
    # Arrange
    invalid_input = [dato inválido]
    
    # Act & Assert
    with pytest.raises([TipoDeExcepcion]) as exc_info:
        funcion_bajo_test(invalid_input)
    
    assert "[mensaje esperado]" in str(exc_info.value)
```

**Test: [Tipo de error 2 - ej: Recurso no encontrado]**
```
[Código de test]
```

**Test: [Tipo de error 3 - ej: Timeout]**
```
[Código de test con timeout/simulación de servicio lento]
```

### Tests con Mocks/Stubs

**Setup de Mocks:**
```python/pytest
@pytest.fixture
def mock_external_service(mocker):
    mock = mocker.patch('module.external_service')
    mock.return_value = [valor mock]
    return mock

def test_[nombre]_con_mock(mock_external_service):
    # Arrange
    mock_external_service.return_value = [respuesta específica]
    
    # Act
    result = funcion_bajo_test([input])
    
    # Assert
    mock_external_service.assert_called_once_with([args esperados])
    assert result == [expected]
```

**Test: Mock retorna error**
```
[Test donde el mock simula fallo del servicio externo]
```

**Test: Mock con side effects secuenciales**
```
[Test donde el mock retorna diferentes valores en cada llamada]
```

---

## TESTS DE INTEGRACIÓN

### Setup de Infraestructura de Test
```python/pytest
@pytest.fixture(scope="module")
def db_connection():
    # Setup: Crear BD de test, migraciones
    conn = create_test_database()
    yield conn
    # Teardown: Limpiar BD
    conn.drop_all()

@pytest.fixture
def repository(db_connection):
    return MyRepository(db_connection)
```

### Tests de Integración con Base de Datos

**Test: Flujo completo de creación y lectura**
```python/pytest
def test_create_and_retrieve_entity(repository):
    # Arrange
    entity_data = {"field": "value", ...}
    
    # Act
    created = repository.create(entity_data)
    retrieved = repository.get_by_id(created.id)
    
    # Assert
    assert retrieved.field == "value"
    assert retrieved.created_at is not None
```

**Test: Queries complejas con joins/filtros**
```
[Test de queries que involucran múltiples tablas]
```

**Test: Transacciones y rollback**
```
[Test que verifica atomicidad de operaciones]
```

### Tests de Integración con APIs Externas

**Test: Contract test con API externa**
```python/pytest
@pytest.mark.integration
def test_external_api_contract():
    # Usar VCR.py o similar para grabar/reproducir
    # o mock estricto con schema validation
    
    response = service.call_external_api()
    
    # Verificar estructura de respuesta
    assert "required_field" in response
    assert isinstance(response["count"], int)
```

**Test: Circuit breaker behavior**
```
[Test de comportamiento cuando API externa falla repetidamente]
```

---

## TESTS E2E (End-to-End)

### Escenarios de Flujo Completo

**Test: [Nombre del flujo crítico]**
```python/pytest
# Usando Playwright, Selenium, o similar
def test_[flujo_usuario_critico](page):
    # Given: Estado inicial
    page.goto("/ruta-inicial")
    
    # When: Acciones del usuario
    page.fill("[data-testid=input]", "valor")
    page.click("[data-testid=submit]")
    
    # Then: Resultado esperado
    assert page.url == "/ruta-esperada"
    assert page.text_content("[data-testid=success]") == "Éxito"
```

**Test: Flujo alternativo/error**
```
[Test de flujo donde el usuario comete errores]
```

---

## COBERTURA Y MÉTRICAS

### Cobertura Esperada
| Tipo | Cobertura Objetivo | Cobertura Actual |
|------|-------------------|------------------|
| Líneas | [X]% | - |
| Branches | [X]% | - |
| Functions | [X]% | - |

### Casos Prioritarios (deben tener tests)
- [ ] [Función/lógica crítica 1]
- [ ] [Función/lógica crítica 2]
- [ ] Todos los handlers de error
- [ ] Toda lógica de negocio compleja

### Casos Opcionales (nice to have)
- [ ] [Función simple con bajo riesgo]
- [ ] Getters/setters triviales

---

## UTILIDADES Y HELPERS DE TEST

### Fixtures Compartidas
```python/pytest
# conftest.py o archivo de fixtures

@pytest.fixture
def valid_user_data():
    return {
        "name": "John Doe",
        "email": "john@example.com",
        "age": 30
    }

@pytest.fixture
def mock_database(mocker):
    return mocker.patch('module.database')
```

### Builders de Datos de Prueba
```python/pytest
class UserBuilder:
    def __init__(self):
        self.data = {
            "name": "Default Name",
            "email": "default@example.com",
            "age": 25
        }
    
    def with_name(self, name):
        self.data["name"] = name
        return self
    
    def with_age(self, age):
        self.data["age"] = age
        return self
    
    def build(self):
        return self.data

# Uso en tests
user = UserBuilder().with_name("Jane").with_age(35).build()
```

### Matchers Personalizados (si aplica)
```
[Custom matchers para assertions más expresivas]
```

---

## DOCUMENTACIÓN DE TESTS

### Convenciones de Nomenclatura
- Archivos: `test_[modulo].py` o `[modulo].test.js`
- Funciones: `test_[accion]_[condicion]_[resultado]`
  - Ej: `test_calculateTotal_withValidItems_returnsSum`
  - Ej: `test_processPayment_withDeclinedCard_raisesPaymentError`

### Organización de Archivos
```
tests/
├── unit/
│   ├── test_domain.py
│   └── test_services.py
├── integration/
│   ├── test_repositories.py
│   └── test_external_apis.py
├── e2e/
│   └── test_user_flows.py
├── fixtures/
│   └── data/
└── conftest.py
```

### Documentación de Tests Complejos
```python/pytest
def test_complex_scenario():
    """
    Test que verifica [comportamiento específico].
    
    Contexto: [Por qué este test es importante]
    Setup: [Qué se configura]
    Expected: [Qué debe pasar]
    
    Regresión relacionada: [Ticket/bug que motivó este test]
    """
    ...
```

---

## CHECKLIST DE CALIDAD DE TESTS

- [ ] Tests son determinísticos (no flaky)
- [ ] Tests son independientes (no comparten estado)
- [ ] Tests son rápidos (unit < 100ms idealmente)
- [ ] Tests tienen assertions específicas (no genéricas)
- [ ] Nombres de tests describen comportamiento, no implementación
- [ ] Tests cubren casos happy path y error
- [ ] Tests cubren casos edge identificados
- [ ] Mocks son verificados (interacciones esperadas)
- [ ] Tests de integración usan test DB/containers
- [ ] Tests documentan comportamiento esperado
- [ ] Cobertura de branches, no solo líneas

---

Genera la suite de tests completa siguiendo los estándares de calidad indicados. Asegúrate de que los tests sean mantenibles y actúen como documentación viva del código.
```

## Ejemplo de Uso

**Input ejemplo:**
"Función de procesamiento de pagos: recibe orderId, amount, paymentMethod. Valida que amount > 0, que order exista en BD, que método de pago sea válido, llama a PaymentGateway.charge(), guarda transacción en BD, retorna resultado. Errores: OrderNotFound, InvalidAmount, PaymentFailed."

**Output esperado:**
- Unit tests: validación de amount, validación de método de pago, lógica con mocks
- Integration tests: flujo completo con test DB
- E2E: flujo de checkout desde UI
- Casos edge: amount=0, amount negativo, amount muy grande, order inexistente
- Error tests: gateway timeout, gateway rechaza, BD no disponible
- Fixtures: builders para orders, métodos de pago
- Mocks: PaymentGateway con respuestas controladas
- Cobertura objetivo: 90% branches

## Notas de calidad
- [ ] Tests siguen patrón AAA o Given-When-Then consistentemente
- [ ] Nombres de tests describen comportamiento, no implementación
- [ ] Hay tests para happy path, error cases, y edge cases
- [ ] Los mocks verifican interacciones esperadas
- [ ] Los tests son determinísticos (no dependen de estado externo)
- [ ] Hay cobertura de branches, no solo líneas
- [ ] Tests de integración usan infraestructura de test aislada
- [ ] Hay fixtures/builders reutilizables
- [ ] Los tests documentan el comportamiento esperado del código
- [ ] La suite es mantenible (no over-mocking)
