---
id: MAN-DEV-002
name: Arquitectura Base
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: tecnico
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

**Ejemplo práctico:**
```typescript
// domain/entities/User.ts
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string
  ) {}

  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }
}

// domain/repositories/UserRepository.ts (interfaz)
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// application/use-cases/CreateUserUseCase.ts
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const user = new User(uuid(), dto.email, dto.name);
    await this.userRepository.save(user);
    return user;
  }
}

// infrastructure/database/PrismaUserRepository.ts
export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Implementación con Prisma
  }
  async save(user: User): Promise<void> {
    // Implementación con Prisma
  }
}
```

---

## Sección 2: MVC (Model-View-Controller)

### Cuándo usar MVC
- Aplicaciones web tradicionales.
- Proyectos pequeños a medianos.
- Operaciones CRUD simples.
- Cuando se requiere rapidez en el desarrollo.

### Componentes

```
Usuario → Controller → Model → Base de datos
            ↓              ↑
         View ←────────────┘
```

**Model**: Datos y lógica de negocio.
**View**: Presentación (plantillas, componentes de React).
**Controller**: Recibe solicitudes (requests), coordina el Modelo y la Vista.

### Ejemplo (Express.js)
```javascript
// models/User.js
class User {
  static async findById(id) {
    return db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
  
  async save() {
    return db.query('INSERT INTO users ...', [this.data]);
  }
}

// controllers/userController.js
class UserController {
  async getUser(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  }
  
  async createUser(req, res) {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  }
}

// routes/userRoutes.js
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
```

---

## Sección 3: Microservicios vs. Monolito

### Comparativa

| Característica | Monolito | Microservicios |
|---------------|----------|----------------|
| **Complejidad** | Baja | Alta |
| **Escalabilidad** | Vertical | Horizontal |
| **Despliegue** | Simple | Complejo |
| **Tamaño del equipo** | Pequeño-medio | Grande |
| **Tecnologías** | Homogénea | Heterogénea |
| **Depuración (Debugging)** | Simple | Compleja |
| **Base de datos** | Compartida | Por servicio |
| **Inicio del proyecto** | Rápido | Lento |

### Decisiones de Live Developer

**Usar Monolito cuando:**
- Se desarrolla un MVP o un proyecto nuevo.
- El equipo es pequeño (menos de 5 desarrolladores).
- El dominio del problema no está plenamente definido.
- Existe la necesidad de un lanzamiento rápido al mercado.

**Usar Microservicios cuando:**
- El equipo es grande y posee dominios de responsabilidad claros.
- Es necesario escalar componentes de forma independiente.
- Múltiples equipos trabajan en paralelo sobre el mismo sistema.
- Se gestiona un sistema heredado (legacy) que requiere migración gradual.

### Monolito Modular
Alternativa recomendada: Monolito con estructura de microservicios.
```
src/
├── modules/
│   ├── users/           # Módulo autónomo
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   ├── orders/          # Módulo autónomo
│   └── products/        # Módulo autónomo
├── shared/              # Código compartido
└── app.ts               # Punto de entrada
```

Beneficios:
- Facilidad en el despliegue del monolito.
- Preparado para una futura extracción a microservicios.
- Código organizado por dominios de negocio.

---

## Sección 4: Domain-Driven Design (DDD)

### Conceptos clave

**Bounded Context**: Límite lógico dentro del cual un modelo de dominio es consistente.
```
┌─────────────┐     ┌─────────────┐
│  Contexto   │     │  Contexto   │
│  Usuarios   │────→│  Pedidos    │
│             │     │             │
│ - User      │     │ - Order     │
│ - Profile   │     │ - Payment   │
└─────────────┘     └─────────────┘
```

**Entidades vs. Value Objects:**
```typescript
// Entidad: Posee identidad única
class Order {
  id: OrderId;           // Identidad
  customerId: CustomerId;
  items: OrderItem[];
  
  cancel(): void {
    if (this.status === 'shipped') {
      throw new Error('Cannot cancel shipped order');
    }
    this.status = 'cancelled';
  }
}

// Value Object: Inmutable, sin identidad propia
class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {}
  
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}
```

**Aggregates:**
```typescript
// Aggregate Root: Punto de entrada único al aggregate
class Order extends AggregateRoot {
  private items: OrderItem[] = [];
  
  addItem(product: Product, quantity: number): void {
    this.items.push(new OrderItem(product, quantity));
    this.total = this.calculateTotal();
  }
  
  // Los ítems solo se modifican a través de la entidad Order
}
```

### Aplicación práctica
1. Identificar los *bounded contexts*.
2. Definir entidades y *value objects*.
3. Identificar los *aggregates*.
4. Crear repositorios para los *aggregates*.
5. Implementar eventos de dominio (*domain events*) para la comunicación entre contextos.

---

## Sección 5: Patrones de Diseño Comunes

### Creacionales

**Singleton (usar con precaución):**
```typescript
// Para configuraciones globales o conexiones únicas
class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}
```

**Factory:**
```typescript
class NotificationFactory {
  create(type: 'email' | 'sms' | 'push'): NotificationService {
    switch (type) {
      case 'email': return new EmailService();
      case 'sms': return new SmsService();
      case 'push': return new PushService();
    }
  }
}
```

**Builder:**
```typescript
const user = new UserBuilder()
  .withName('John')
  .withEmail('john@example.com')
  .withRole('admin')
  .build();
```

### Estructurales

**Repository Pattern:**
```typescript
// Abstracción de la persistencia de datos
interface UserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
```

**Adapter Pattern:**
```typescript
// Adaptación de APIs externas
interface PaymentGateway {
  charge(amount: number, token: string): Promise<ChargeResult>;
}

class StripeAdapter implements PaymentGateway {
  constructor(private stripe: Stripe) {}
  
  async charge(amount: number, token: string): Promise<ChargeResult> {
    const result = await this.stripe.charges.create({ amount, source: token });
    return { success: result.status === 'succeeded', id: result.id };
  }
}
```

### Comportamiento

**Strategy:**
```typescript
interface DiscountStrategy {
  calculateDiscount(amount: number): number;
}

class PercentageDiscount implements DiscountStrategy {
  constructor(private percentage: number) {}
  calculateDiscount(amount: number): number {
    return amount * this.percentage / 100;
  }
}

class FixedDiscount implements DiscountStrategy {
  constructor(private discount: number) {}
  calculateDiscount(amount: number): number {
    return Math.min(amount, this.discount);
  }
}

// Uso práctico
const calculator = new PriceCalculator(new PercentageDiscount(10));
```

**Observer / Event-Driven:**
```typescript
// Domain Events (Eventos de Dominio)
class OrderCreatedEvent {
  constructor(public orderId: string, public customerId: string) {}
}

class EmailNotificationHandler {
  handle(event: OrderCreatedEvent): void {
    // Lógica para enviar correo de confirmación
  }
}

// Dentro del aggregate
class Order extends AggregateRoot {
  create() {
    // ...
    this.addDomainEvent(new OrderCreatedEvent(this.id, this.customerId));
  }
}
```

---

## Sección 6: Arquitectura Frontend

### Component-Based Architecture (Arquitectura Basada en Componentes)
```
src/
├── components/
│   ├── atoms/           # Componentes básicos (átomos)
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Label/
│   ├── molecules/       # Combinación de átomos (moléculas)
│   │   ├── SearchBar/
│   │   └── FormField/
│   ├── organisms/       # Componentes complejos (organismos)
│   │   ├── Header/
│   │   └── ProductCard/
│   ├── templates/       # Estructuras de página (plantillas)
│   └── pages/           # Páginas completas
```

### State Management (Gestión de Estado)
**Estado Local (useState):**
- Formularios simples.
- Estado de la interfaz de usuario (modales, selectores).
- Datos que no requieren ser compartidos.

**Estado Global (Context/Redux/Zustand):**
- Datos del usuario autenticado.
- Configuración global de la aplicación.
- Estado del carrito de compras.

**Estado del Servidor (React Query/SWR):**
- Datos provenientes del servidor.
- Caché de APIs.
- Sincronización optimista de datos.

### Container/Presentational Pattern
```typescript
// Container: Gestiona la lógica y los datos
const UserListContainer = () => {
  const { data: users, isLoading } = useQuery('users', fetchUsers);
  const deleteUser = useMutation(deleteUserApi);
  
  return <UserList users={users} onDelete={deleteUser.mutate} />;
};

// Presentational: Se encarga exclusivamente del renderizado
const UserList = ({ users, onDelete }: UserListProps) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} <button onClick={() => onDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
```

---

## Sección 7: Principios SOLID en la Práctica

| Principio | Descripción | Ejemplo Práctico |
|-----------|-------------|------------------|
| **S**ingle Responsibility | Una clase debe tener una única razón para cambiar. | Separar la validación de la persistencia de datos. |
| **O**pen/Closed | Abierto para la extensión, cerrado para la modificación. | Agregar nuevos tipos de notificación sin alterar el código existente. |
| **L**iskov Substitution | Las clases derivadas deben poder sustituir a sus clases base. | Un repositorio de MongoDB que sustituye a uno de Postgres sin errores. |
| **I**nterface Segregation | Interfaces pequeñas y específicas son preferibles a una genérica. | Usar `Readable` y `Writable` en lugar de una interfaz monolítica. |
| **D**ependency Inversion | Depender de abstracciones, no de implementaciones concretas. | Inyectar una interfaz `UserRepository` en lugar de una clase específica. |

---

## Checklist/Resumen Rápido

### Al diseñar la arquitectura
- [ ] Identificar los *bounded contexts* del dominio.
- [ ] Definir claramente las capas y sus responsabilidades.
- [ ] Establecer y respetar la regla de dependencia.
- [ ] Elegir entre Monolito o Microservicios según el contexto del proyecto.
- [ ] Definir interfaces antes de proceder con las implementaciones.

### Al implementar
- [ ] Las entidades no dependen de marcos de trabajo (frameworks).
- [ ] Los casos de uso permanecen independientes de la interfaz de usuario (UI).
- [ ] Los repositorios son interfaces; las implementaciones residen en la capa de infraestructura.
- [ ] Los eventos de dominio desacoplan los *bounded contexts*.
- [ ] Cada módulo dispone de su propio espacio de nombres (namespace).

### Antes del lanzamiento (Release)
- [ ] Documentar la arquitectura mediante diagramas (modelo C4).
- [ ] Verificar la ausencia de dependencias circulares.
- [ ] Ejecutar pruebas unitarias para las entidades de dominio.
- [ ] Ejecutar pruebas de integración para los casos de uso.

---

## Recursos Adicionales

- [Clean Architecture - Robert C. Martin](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Domain-Driven Design - Eric Evans](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)
- [The C4 Model](https://c4model.com/)
- [Microservices Patterns - Chris Richardson](https://microservices.io/book)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
