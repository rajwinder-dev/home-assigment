# EmployeeFlow

EmployeeFlow is a full-stack employee management application built as a portfolio and job-assignment project. It demonstrates a realistic HR-style workflow for managing organizations, departments, employees, roles, authentication, and permissions in a modern web application.

The project combines a React frontend, an Express-based backend, Prisma/PostgreSQL persistence, and an Nx monorepo structure to simulate a production-ready multi-tenant platform.

## Project Overview

EmployeeFlow is designed to showcase:

- Secure authentication and session handling
- Role-based access control (RBAC)
- Multi-organization workspace navigation
- Employee lifecycle management
- Department and hierarchy modeling

This makes it a strong example of full-stack development, state management, API design, and UI implementation for an assignment or interview portfolio.

## Key Features

- Authentication flow with sign-in, sign-up, password reset, and invite-based onboarding
- Protected routes and role-aware dashboard access
- Organization management with workspace switching
- Department and employee management screens
- Employee creation, editing, role assignment, and manager relationships
- RBAC pages for roles and permissions
- Settings screens for profile and organization configuration

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Radix UI components

### Backend

- Express.js with TypeScript
- Better Auth
- Prisma ORM
- PostgreSQL
- Redis for supporting services

### Architecture & Tooling

- Nx monorepo
- pnpm workspaces
- Docker Compose
- ESLint and TypeScript configuration

## Project Structure

- app/web: frontend application and UI features
- app/api: backend API services and modules
- packages/: shared libraries for constants, core logic, utilities, zod validation, and database access
- packages/database: Prisma schema, migrations, and generated client

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Docker (optional, for running supporting services)

## Environment Configuration

Copy the .env.example file to .env and update the values as needed.

### Installation

```bash
pnpm install
```

### Build packages

```bash
pnpm run build
```

### Run the application locally

```bash
pnpm run dev
```

This starts the workspace services using Nx.

### Run with Docker (optional)

```bash
docker compose up --build
```

note: the compose file have email-worker it will setup and run the email service

## Assignment Context

This repository was created to reflect a practical assignment for a software engineering or product-development role. The goal is to demonstrate:

- end-to-end full-stack implementation
- clean project structure and modular architecture
- secure and practical business logic for HR and workforce operations
- professional documentation and deployment readiness

## Future Enhancements

Possible next steps include:

- richer analytics and reporting dashboards
- audit trails and advanced activity insights
- improved test coverage
- deployment automation and CI/CD pipeline setup

## License

This project is intended for educational and portfolio purposes.
