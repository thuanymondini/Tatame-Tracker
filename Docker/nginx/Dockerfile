# ── Stage 1: build do frontend ────────────────────────────────
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY app/package*.json ./
RUN npm i
COPY app .
RUN npm run build          # gera /app/dist

# ── Stage 2: nginx servindo estático + proxy para PHP ─────────
FROM nginx:1.25-alpine

# Copia os assets buildados
COPY --from=frontend-builder /app/dist /var/www/html/public/spa

# Copia a config de produção
COPY Docker/nginx/default.conf /etc/nginx/conf.d/default.conf