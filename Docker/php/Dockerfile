FROM php:8.3-fpm

# Instala extensões comuns
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo pdo_mysql gd zip opcache

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html