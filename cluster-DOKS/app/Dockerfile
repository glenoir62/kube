FROM php:8.2-fpm
RUN apt-get update && apt-get install -y netcat-traditional && docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli pdo_mysql
WORKDIR /app
COPY . .
CMD ["php-fpm"]
EXPOSE 9000