FROM node:10 as base
RUN mkdir -p /usr/diego
WORKDIR /usr/diego
COPY package*.json ./
RUN npm install -g pm2 yarn
RUN yarn install
COPY . .
RUN yarn run build

FROM base as diego-dev
EXPOSE 8080 80
CMD [ "pm2", "start", "ecosystem.config.js", "--env", "development", "--no-daemon" ]

FROM base as diego
EXPOSE 8081 80
CMD [ "pm2", "start", "ecosystem.config.js", "--env", "production", "--no-daemon" ]