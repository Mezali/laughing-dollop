services:
  php:
    image: php:7.4-apache
    restart: "always"
    ports:
      - 80:80
    volumes:
      - ./www:/var/www/html/