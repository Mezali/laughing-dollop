FROM php:7.4.2-apache-buster

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install certbot -y && apt-get install python3-certbot-apache -y

RUN apt-get -y update && \
    apt-get -y --no-install-recommends install default-mysql-client \
    && \
    apt-get -y --no-install-recommends install --fix-missing apt-utils \
    build-essential \
    && \ 
    apt-get -y --no-install-recommends install --fix-missing libcurl4 \
    openssl && \
    rm -rf /var/lib/apt/lists/* && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo_mysql && docker-php-ext-install mysqli && docker-php-ext-install json && docker-php-ext-install exif
RUN rm -rf /usr/src/*
RUN certbot run -n --apache --agree-tos -d www.sgpo.online,sgpo.online -m danieldelimamazali@hotmail.com --redirect
