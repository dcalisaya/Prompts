---
id: MAN-DEV-002
name: Arquitectura Base
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: guia-maestra
version: 1.0.0
related_services: ["DEV-001", "DEV-002", "DEV-003", "DEV-004", "DEV-005", "DEV-006", "DEV-007", "DEV-008", "DEV-009", "DEV-010"]
related_agents: ["ArquitectoSoftware", "TechLeadFullStack"]
related_prompts: ["DEV-002"]
source_of_truth: true
tags: [arquitectura, clean-architecture, patrones, ddd, mvc]
legacy_id: MAN-DEV-002
migrated_from: base/masters/manuales-desarrollo/arquitectura_base.md
---

# Arquitectura Base

## Resumen
Este manual documenta los patrones arquitectónicos, estilos de diseño y principios fundamentales que Live Developer utiliza para construir aplicaciones escalables, mantenibles y robustas.

---

## Sección 1: Clean Architecture

### Conceptos fundamentales
Clean Architecture organiza el código en capas concéntricas, donde las capas internas no dependen de las externas.

```
┌─────────────────────────────────────────────────────┐
│                  Frameworks/UI                      │  ← Capa externa
│  (React, Express, Django, FastAPI)                  │     (sujeta a cambios frecuentes)
├─────────────────────────────────────────────────────┤
│              Interface Adapters                     │  ← Controladores, Presenters
│  (Controllers, Gateways, Presenters)                │
├─────────────────────────────────────────────────────┤
│               Use Cases                             │  ← Casos de uso (lógica de negocio)
│  (Application Business Rules)                       │
├─────────────────────────────────────────────────────┤
│               Entities                              │  ← Entidades de negocio (más estable)
│  (Enterprise Business Rules)                        │
└─────────────────────────────────────────────────────┘
```

### Regla de dependencia
> "Las dependencias del código fuente deben apuntar solo hacia adentro, hacia políticas de alto nivel."

### Implementación en proyectos

**Estructura de carpetas:**
```
src/
├── domain/              # Entidades y reglas de negocio
│   ├── entities/
│   ├── repositories/    # Interfaces (no implementaciones)
│   └── value-objects/
├── application/         # Casos de uso
│   ├── use-cases/
│   ├── dto/
│   └── interfaces/
├── infrastructure/      # Implementaciones concretas
│   ├── database/
│   ├── http/
│   └── external/
└── presentation/        # Controladores/UI
    ├── controllers/
    ├── middleware/
    └── routes/
```

---

## Sección 2: Patrones de Diseño Comunes

### Repository Pattern
```typescript
interface UserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
```

### Adapter Pattern
```typescript
interface PaymentGateway {
  charge(amount: number, token: string): Promise<ChargeResult>;
}

class StripeAdapter implements PaymentGateway {
  async charge(amount: number, token: string): Promise<ChargeResult> {
    const result = await this.stripe.charges.create({ amount, source: token });
    return { success: result.status === 'succeeded', id: result.id };
  }
}
```

### Strategy Pattern
```typescript
interface DiscountStrategy {
  calculateDiscount(amount: number): number;
}

class PercentageDiscount implements DiscountStrategy {
  calculateDiscount(amount: number): number {
    return amount * this.percentage / 100;
  }
}
```

---

## Sección 3: Principios SOLID en la Práctica

| Principio | Descripción |
|-----------|-------------|
| **S**ingle Responsibility | Una clase debe tener una única razón para cambiar. |
| **O**pen/Closed | Abierto para la extensión, cerrado para la modificación. |
| **L**iskov Substitution | Las clases derivadas deben poder sustituir a sus clases base. |
| **I**nterface Segregation | Interfaces pequeñas y específicas son preferibles a una genérica. |
| **D**ependency Inversion | Depender de abstracciones, no de implementaciones concretas. |

---

## Checklist de Arquitectura

### Al diseñar la arquitectura
- [ ] Identificar los *bounded contexts* del dominio.
- [ ] Definir claramente las capas y sus responsabilidades.
- [ ] Establecer y respetar la regla de dependencia.
- [ ] Definir interfaces antes de proceder con las implementaciones.

### Antes del lanzamiento (Release)
- [ ] Documentar la arquitectura mediante diagramas (modelo C4).
- [ ] Verificar la ausencia de dependencias circulares.
- [ ] Ejecutar pruebas unitarias para las entidades de dominio.

---

## Recursos Adicionales

- [Clean Architecture - Robert C. Martin](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Domain-Driven Design - Eric Evans](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)
- [The C4 Model](https://c4model.com/)
