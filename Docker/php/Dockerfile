FROM php:8.3-fpm-alpine

# Dependências em uma única camada + limpeza imediata
RUN apk add --no-cache \
    libpng-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo pdo_mysql gd zip opcache \
    && rm -rf /var/cache/apk/*

# OPcache otimizado para produção
RUN { \
    echo "opcache.enable=1"; \
    echo "opcache.memory_consumption=128"; \
    echo "opcache.interned_strings_buffer=8"; \
    echo "opcache.max_accelerated_files=10000"; \
    echo "opcache.revalidate_freq=60"; \
    echo "opcache.fast_shutdown=1"; \
} > /usr/local/etc/php/conf.d/opcache.ini

# PHP-FPM com mais workers
RUN { \
    echo "[www]"; \
    echo "pm = dynamic"; \
    echo "pm.max_children = 20"; \
    echo "pm.start_servers = 5"; \
    echo "pm.min_spare_servers = 3"; \
    echo "pm.max_spare_servers = 10"; \
    echo "pm.max_requests = 500"; \
} > /usr/local/etc/php-fpm.d/zz-custom.conf

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html