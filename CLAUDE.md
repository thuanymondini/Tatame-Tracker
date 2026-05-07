# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TatameTrack is a jiu-jitsu training tracker. It has two separate sub-projects:
- `api/` — Laravel 13 / PHP 8.3 REST API
- `app/` — React 19 / TypeScript / Vite frontend

The full stack runs via Docker Compose, with Nginx serving both static assets and proxying API requests.

## Development Commands

### Docker (primary workflow)

```bash
# Start all services (nginx, php, mysql)
docker-compose up -d

# First-time setup after starting containers
docker-compose exec php php artisan optimize
docker-compose exec php php artisan migrate
docker-compose exec php php artisan db:seed

# Run artisan commands
docker-compose exec php php artisan <command>

# Watch logs
docker-compose logs -f php
```

### Backend (`api/`)

```bash
# Install deps, generate app key, run migrations
composer setup

# Dev server with hot reload + queue listener (runs concurrently)
composer dev

# Run tests
composer test

# Single test file
./vendor/bin/phpunit tests/Feature/SomeTest.php

# Format/lint PHP (Laravel Pint)
./vendor/bin/pint
```

### Frontend (`app/`)

```bash
npm install
npm run dev      # Vite dev server on port 5173
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

### Backend — `api/`

Laravel follows a standard MVC structure with DTOs and Resource transformers:

- **Routes** → `routes/api.php` (RESTful endpoints for techniques, categories, workouts)
- **Controllers** → `app/Http/Controllers/` — thin controllers that delegate to Eloquent
- **Form Requests** → `app/Http/Requests/` — input validation
- **Resources** → `app/Http/Resources/` — response shaping/transformation
- **DTOs** → `app/DTOs/` — typed data transfer between layers
- **Models** → `app/Models/` — Eloquent models with relationships

Three domain models: `TechniqueCategory` → `Technique` (self-referential via `linked_technique`) ↔ `DailyWorkout` (many-to-many via `daily_workout_techniques`).

Tests use SQLite in-memory (configured in `phpunit.xml`). Real services use MySQL.

### Frontend — `app/`

```
src/
  actions/      # Axios API calls (one file per domain entity)
  components/   # Feature components + ui/ (Shadcn primitives)
  hooks/        # Custom React hooks
  layouts/      # Page wrapper layouts
  pages/        # Route-level page components
  types/        # TypeScript interfaces
```

`App.tsx` defines client-side routes via React Router. `actions/` is the sole API integration layer — components do not call Axios directly.

### Docker setup

- **Dev** (`docker-compose.yml`): code volumes mounted for live reload; MySQL port 3306 exposed; nginx uses `Dockerfile.dev` (no frontend build step).
- **Prod** (`docker-compose.prod.yml`): multi-stage Nginx build — stage 1 compiles the React app with Node 20, stage 2 serves static assets and proxies `/api/*` to PHP-FPM; MySQL port not exposed.

The PHP image (`Docker/php/Dockerfile`) is PHP 8.3-FPM Alpine with OPcache tuned for production (128 MB, 10k files) and a dynamic FPM worker pool.

## Environment

Copy `api/.env.example` to `api/.env` before running. Key variables:
- `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` — match values in `docker-compose.yml`
- `APP_URL` — used by Laravel for asset generation
- `VITE_APP_NAME` — consumed by the frontend build
