import { ModuleResponse } from "@/types";

export const requirementsResponse: ModuleResponse = {
  memoryTitle: "Requirements generated",
  memorySummary: "PRD, 14 user stories, edge cases, and risk register created",
  tabs: [
    {
      id: "prd",
      label: "PRD",
      content: `## FoodDeliveryApp — Product Requirements Document

### Objective
Build a campus-focused food delivery platform that connects university students with local restaurants, enabling fast ordering, real-time tracking, and secure payments.

### Target Users
- **Students (18–25):** Order food between classes, track delivery in real-time
- **Restaurant partners:** Manage menus and incoming orders via dashboard
- **Campus admins:** Monitor platform usage and resolve disputes

### Core Features
1. User registration and JWT-based authentication
2. Restaurant browsing with filters (cuisine, rating, delivery time)
3. Cart management and Stripe checkout
4. Real-time order tracking with WebSocket updates
5. Order history and reorder functionality
6. Admin panel for restaurant onboarding

### Success Metrics
- Order completion rate > 95%
- Average delivery time < 35 minutes
- User retention > 60% after 30 days`,
    },
    {
      id: "stories",
      label: "User Stories",
      content: `### Epic 1: Authentication (4 stories)
1. **US-01:** As a student, I want to register with my university email so that only campus users can access the platform.
2. **US-02:** As a student, I want to log in with email/password so that I can access my account securely.
3. **US-03:** As a student, I want to reset my password via email so that I can recover my account.
4. **US-04:** As a student, I want to stay logged in with refresh tokens so that I don't re-login every session.

### Epic 2: Ordering (5 stories)
5. **US-05:** As a student, I want to browse restaurants by cuisine so that I can find food I like.
6. **US-06:** As a student, I want to add items to a cart so that I can order multiple dishes.
7. **US-07:** As a student, I want to pay with Stripe so that checkout is secure.
8. **US-08:** As a student, I want to track my order in real-time so that I know when it arrives.
9. **US-09:** As a student, I want to view order history so that I can reorder favorites.

### Epic 3: Restaurant Management (3 stories)
10. **US-10:** As a restaurant, I want to update my menu so that students see current offerings.
11. **US-11:** As a restaurant, I want to accept/reject orders so that I control my workload.
12. **US-12:** As a restaurant, I want to set delivery radius so that I only serve nearby campus areas.

### Epic 4: Admin (2 stories)
13. **US-13:** As an admin, I want to onboard restaurants so that the platform grows.
14. **US-14:** As an admin, I want to view platform analytics so that I monitor health.`,
    },
    {
      id: "edge-cases",
      label: "Edge Cases",
      content: `### Authentication
- User registers with non-university email → reject with clear message
- Refresh token expired → force re-login, preserve cart state
- Concurrent login from multiple devices → allow, track sessions

### Ordering
- Restaurant closes mid-order → cancel gracefully, refund via Stripe
- Item goes out of stock after adding to cart → notify at checkout
- Delivery address outside campus geofence → block with explanation
- Payment fails after order created → rollback order, retry payment

### Real-time Tracking
- WebSocket disconnects → fall back to polling every 10s
- Driver GPS unavailable → show last known location with timestamp
- Order cancelled after payment → trigger Stripe refund automatically`,
    },
    {
      id: "risks",
      label: "Risk Register",
      content: `| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R1 | Stripe integration delays | Medium | High | Start Stripe sandbox in Week 3 |
| R2 | Real-time tracking complexity | High | Medium | MVP with polling, WebSocket in v2 |
| R3 | Restaurant onboarding slow | Medium | Medium | Seed 5 partner restaurants at launch |
| R4 | JWT security vulnerabilities | Medium | High | Security review in Code phase |
| R5 | Campus geofence accuracy | Low | Medium | Use university-provided boundary data |`,
    },
  ],
};

export const requirementsSampleInput =
  "I want to build a food delivery app for university students. Students should be able to browse local restaurants, add items to a cart, pay with Stripe, and track their order in real-time. Restaurants need a dashboard to manage menus and orders. Only users with university email addresses should be able to register.";

export const userStories = [
  "US-01: Register with university email",
  "US-02: Login with email/password",
  "US-04: Stay logged in with refresh tokens",
  "US-06: Add items to cart",
  "US-08: Track order in real-time",
];
