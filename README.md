# Tatame Tracker

Projeto full-stack de treinos de jiu-jitsu desenvolvido com Laravel (backend) e ReactJS (frontend), com a biblioteca shadcn.

## 🚀 Como Rodar o Projeto Localmente com Docker

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd TatameTrack
```

### 2. Iniciar o sistema
O sistema é feito com docker e docker compose, portanto para subi-lo basta rodar:

```bash
docker-compose up -d
```

### 3. Semeie o banco de dados
Por padrão o sistema tem algumas categorias, após iniciá-lo deve-se semear o banco de dados com:

```bash
docker-compose exec php artisan db:seed
```

### 4. Para desenvolvimento
Em ambientes de desenvolvimento o frontend não vai ser montado estaticamente para usar os recursos do hotreload
Então, caso esteja desenvolvendo, após subir o backend suba o front manualmente com:

```bash
cd app
npm i
npm run dev
```

### 4. Acesse a Aplicação

- **Web**: http://localhost

## 📍 Como está organizado

### Backend

- **Rotas**: `api/routes/api.php`
- **Controller**: `api/app/Http/Controllers`
- **Model**: `api/app/Models`
- **Migration**: `api/database/migrations`
- **Seeders**: `api/database/seeders`

**Endpoints:**
- `GET       /api/technique` - Listar técnicas
- `GET       /api/technique/{id}` - Listar uma técnica
- `POST      /api/technique` - Adicionar técnica
- `PUT/PATCH /api/technique/{id}` - Editar uma técnica
- `DELETE    /api/technique/{id}` - Remover técnica

### Frontend

- **Actions**: `app/src/actions`
- **Components**: `app/src/components`
- **Hooks**: `app/src/hooks`
- **Layouts**: `app/src/layouts`
- **Pages**: `app/src/pages`
- **Types**: `app/src/types`
- **Routes**: `app/src/App.tsx`

## 🛠 Tecnologias

- **Backend**: Laravel 13, MySQL, nginx
- **Frontend**: ReactJS, Vite, shadcn
- **Infraestrutura**: Docker, Docker Compose