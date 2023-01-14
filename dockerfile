FROM php:7-apache-buster

RUN docker-php-ext-install pdo pdo_mysql mysqli

COPY ./www/ /var/www/html/

EXPOSE 80