FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www
COPY ./public /var/www/public
EXPOSE 80

##docker build -t dymafr/projet3-nginx .