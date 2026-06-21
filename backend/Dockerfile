FROM php:8.2-fpm

# Instalacija sistemskih zavisnosti
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Čišćenje keša
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalacija PHP ekstenzija potrebnih za Laravel
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Preuzimanje najnovijeg Composera
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Postavljanje radnog direktorijuma
WORKDIR /var/www

# Kopiranje postojećeg koda aplikacije
COPY . /var/www



EXPOSE 9000
CMD ["php-fpm"]