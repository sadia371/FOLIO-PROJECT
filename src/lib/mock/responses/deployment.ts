import { ModuleResponse } from "@/types";

export const deploymentResponse: ModuleResponse = {
  memoryTitle: "Deployment guide generated",
  memorySummary: "CI/CD pipeline, checklist, and security review saved",
  tabs: [
    {
      id: "checklist",
      label: "Checklist",
      content: `## Deployment Checklist — FoodDeliveryApp

### Pre-deploy
- [ ] All unit tests passing (target: 80%+ coverage on auth + orders)
- [ ] Environment variables documented in .env.example
- [ ] Database migrations tested on staging
- [ ] Stripe webhook endpoint verified in sandbox
- [ ] SSL certificate provisioned (AWS ACM)

### Infrastructure
- [ ] ECS Fargate service configured (2 tasks, auto-scaling)
- [ ] RDS PostgreSQL instance (db.t3.micro for staging)
- [ ] Redis ElastiCache for session/token cache
- [ ] S3 bucket for static assets
- [ ] CloudFront CDN for frontend

### Post-deploy
- [ ] Health check endpoint responding (/api/v1/health)
- [ ] Smoke test: register → login → create order
- [ ] Monitoring alerts configured (CloudWatch)
- [ ] Rollback plan documented`,
    },
    {
      id: "cicd",
      label: "CI/CD YAML",
      isCode: true,
      content: `name: Deploy FoodDeliveryApp

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:cov
      - run: npm run lint

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: npm run build
      - run: npx prisma migrate deploy
      - name: Deploy to ECS
        run: aws ecs update-service --cluster food-delivery --service api --force-new-deployment`,
    },
    {
      id: "security",
      label: "Security",
      content: `## Pre-Launch Security Checklist

- [ ] HTTPS enforced on all endpoints (redirect HTTP → HTTPS)
- [ ] JWT secrets stored in AWS Secrets Manager, not .env in production
- [ ] CORS restricted to known frontend domains
- [ ] Rate limiting on auth endpoints (10 req/min per IP)
- [ ] Input validation on all API endpoints (class-validator)
- [ ] SQL injection prevention via Prisma parameterized queries
- [ ] Stripe webhook signature verification enabled
- [ ] Security headers: HSTS, X-Content-Type-Options, X-Frame-Options
- [ ] Dependency audit: npm audit --production (0 high/critical)
- [ ] OWASP Top 10 review completed for auth module`,
    },
    {
      id: "env",
      label: ".env Guide",
      content: `## Environment Configuration

\`\`\`
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/fooddelivery

# JWT
JWT_ACCESS_SECRET=<random-64-chars>
JWT_REFRESH_SECRET=<random-64-chars>
JWT_ACCESS_EXPIRY=15m

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3001
\`\`\`

**Secret management:** Use AWS Secrets Manager in production. Never commit .env files. Rotate JWT secrets quarterly.`,
    },
  ],
};
