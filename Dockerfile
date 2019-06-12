FROM node:10 as base
RUN mkdir -p /usr/diego
WORKDIR /usr/diego
COPY package*.json ./
RUN npm install -g pm2 yarn
RUN yarn install
COPY . .
RUN yarn run build

FROM base as diego-dev
EXPOSE 8080
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "development" ]
RUN pm2 startup

FROM base as diego
EXPOSE 8081
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]
RUN pm2 startup