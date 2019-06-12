FROM nginx as diego-dev

COPY ./getewayDev.conf /etc/nginx/conf.d/default.conf

FROM nginx as diego

COPY ./getewayProd.conf /etc/nginx/conf.d/default.conf