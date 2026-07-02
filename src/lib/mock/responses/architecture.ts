import { ModuleResponse } from "@/types";

export const architectureResponse: ModuleResponse = {
  memoryTitle: "Architecture decisions reviewed",
  memorySummary: "Stack, schema, API contract, and diagram updated for FoodDeliveryApp",
  tabs: [
    {
      id: "stack",
      label: "Stack Rec",
      content: `## Active Tech Stack — FoodDeliveryApp

| Layer | Choice | Status | Justification |
|-------|--------|--------|---------------|
| Language | TypeScript | Implemented | Type safety for API contracts and shared DTOs |
| Backend | NestJS | Implemented | Modular architecture, built-in guards for JWT auth |
| Frontend | Next.js 14 | Planned | SSR for restaurant listings, App Router for dashboard |
| Database | PostgreSQL | Implemented | Relational data (orders, users, restaurants), ACID for payments |
| ORM | Prisma | Implemented | Type-safe queries, migration management |
| Auth | JWT + Refresh tokens | Implemented | Stateless, works with mobile clients later |
| Payments | Stripe | Sandbox ready | Industry standard, sandbox for development |
| Real-time | Socket.io | Planned | Fallback-friendly, NestJS gateway support |
| Hosting | AWS (ECS + RDS) | Planned | Scalable, university has AWS credits |

### Decision: PostgreSQL over MongoDB
PostgreSQL chosen for transactional order data and relational integrity between users, orders, and restaurants. MongoDB deferred — no document-heavy unstructured data in v1.

### Decision: NestJS over Express
NestJS chosen for modular architecture, dependency injection, and built-in support for guards, interceptors, and pipes. Reduces boilerplate for JWT auth and validation.`,
    },
    {
      id: "schema",
      label: "DB Schema",
      content: `## Entity-Relationship Schema

### users
- id: UUID (PK)
- email: VARCHAR(255) UNIQUE
- password_hash: VARCHAR(255)
- role: ENUM('student', 'restaurant', 'admin')
- university_id: VARCHAR(50)
- created_at: TIMESTAMP

### restaurants
- id: UUID (PK)
- name: VARCHAR(255)
- cuisine: VARCHAR(100)
- rating: DECIMAL(2,1)
- delivery_radius_km: DECIMAL(4,2)
- is_active: BOOLEAN
- owner_id: UUID (FK -> users)

### menu_items
- id: UUID (PK)
- restaurant_id: UUID (FK -> restaurants)
- name: VARCHAR(255)
- price: DECIMAL(8,2)
- is_available: BOOLEAN

### orders
- id: UUID (PK)
- user_id: UUID (FK -> users)
- restaurant_id: UUID (FK -> restaurants)
- status: ENUM('pending', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled')
- total: DECIMAL(10,2)
- stripe_payment_id: VARCHAR(255)
- created_at: TIMESTAMP

### order_items
- id: UUID (PK)
- order_id: UUID (FK -> orders)
- menu_item_id: UUID (FK -> menu_items)
- quantity: INTEGER
- unit_price: DECIMAL(8,2)`,
    },
    {
      id: "api",
      label: "API Contract",
      content: `## REST API Endpoints (v1)

### Auth — Implemented
- POST /api/v1/auth/register — { email, password, universityId }
- POST /api/v1/auth/login — { email, password } -> { accessToken, refreshToken }
- POST /api/v1/auth/refresh — { refreshToken } -> { accessToken }
- POST /api/v1/auth/logout — { refreshToken }

### Restaurants — Pending
- GET /api/v1/restaurants — ?cuisine=&rating=&page=
- GET /api/v1/restaurants/:id — restaurant detail + menu
- PUT /api/v1/restaurants/:id/menu — update menu (restaurant role)

### Orders — Partially Implemented
- POST /api/v1/orders — { restaurantId, items[], deliveryAddress }
- GET /api/v1/orders — user's order history
- GET /api/v1/orders/:id — order detail + tracking
- PATCH /api/v1/orders/:id/status — update status (restaurant role)

### Payments — Pending
- POST /api/v1/payments/intent — create Stripe payment intent
- POST /api/v1/payments/webhook — Stripe webhook handler`,
    },
    {
      id: "diagram",
      label: "Diagram",
      content: `MERMAID:graph TB
    subgraph client [Client Layer]
        WebApp[Next.js Web App]
        MobileApp[Mobile App - v2]
    end
    subgraph api [API Layer]
        Gateway[NestJS API Gateway]
        AuthMod[Auth Module]
        OrderMod[Order Module]
        RestMod[Restaurant Module]
        PayMod[Payment Module]
    end
    subgraph data [Data Layer]
        PG[(PostgreSQL)]
        Redis[(Redis Cache)]
    end
    subgraph external [External Services]
        Stripe[Stripe API]
        WS[Socket.io]
    end
    WebApp --> Gateway
    MobileApp --> Gateway
    Gateway --> AuthMod
    Gateway --> OrderMod
    Gateway --> RestMod
    Gateway --> PayMod
    AuthMod --> PG
    OrderMod --> PG
    RestMod --> PG
    PayMod --> Stripe
    OrderMod --> WS
    AuthMod --> Redis`,
    },
  ],
};
