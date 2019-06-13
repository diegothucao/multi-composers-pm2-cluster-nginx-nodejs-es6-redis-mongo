FROM nginx as diego-dev-nginx

COPY ./getewayDev.conf /etc/nginx/conf.d/default.conf

FROM nginx as diego-nginx

COPY ./getewayProd.conf /etc/nginx/conf.d/default.conf