# Nginx, Docker/multi-composers, Pm2, Cluster, Nodejs, Redis, Babel and ES6

This is an essential example to build docker with multi composers, pm2, nodejs/es6, nginx, redis and cluster.

Step to run
1. Clone the [repo](https://github.com/diegothucao/multi-composers-pm2-cluster-nginx-nodejs-es6-redis)
2. Run development mode `docker-compose -f docker-compose.dev.yml up --build` or Production mode `docker-compose -f docker-compose.prod.yml up --build`
3. Open [localhost](http://localhost)
4. Test Redis
	- Run [set data redis](http://localhost/store/diego)
	- Run [get data redis](http://localhost/diego)

create basic `Nodejs` code  
```javascript 

import express from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'
import redisClient from './redis-client'

dotenv.load()

const app = express()
app.use(urlencoded({ extended: true, limit: '500mb'}))
app.use(json({ extended: true, limit: '500mb'}))
app.use(cors())

app.get('/', (_, res) => {
  res.send('Diego Cao: Hello')
})

// set data to Redis
app.get('/store/:key', async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  await redisClient.setAsync(key, value)
  return res.send('Success')
})

// get data from Redis 
app.get('/:key', async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(awData);
})

let server = app.listen(process.env.PORT || 8080)
server.setTimeout(500000)
```
Multi target 

```python
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
```

Docker composer 

```
version: '3.4'
services:
  proxy:
    container_name: diego-dev-nginx
    build:
      dockerfile: Dockerfile
      target: diego-dev-nginx
      context: ./nginx
    ports:
      - "80:80"
    links:
      - diego-dev
  
  diego-dev-redis:
    image: redis
    container_name: diego-dev-redis
    expose:
      - 6379

  diego-dev:
    build:
      context: .
      target: diego-dev
      dockerfile: ./Dockerfile
    container_name: diego-dev
    restart: always
    ports:
      - "8080:8080"
    links:
      - diego-dev-redis
    volumes:
      - .:/diego
    tty: true
    environment:
      PORT: 8080
      REDIS_URL: redis://diego-dev-redis     
```
PM2 configuration 
```javascript
module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    exec_mode: 'cluster',
    instances: "max",
    env: {
      name : 'diego-dev',
      NODE_ENV: 'development'
    },
    env_production : {
      name : 'diego-pro',
      NODE_ENV: 'production'
    }
  }]
}
```

Nginx configuration 
```
upstream diego-dev {
  server diego-dev:8080;
}

server {
    listen              80;    
    # error_page 404 /404.html;
    #     location = /40x.html {}

    # error_page 500 502 503 504 /50x.html;
    #     location = /50x.html {}
    location / {
      proxy_pass http://diego-dev;
    }
}
```
	
If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks
	
references
 1. https://docs.docker.com/install/	
 2. http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
 3. https://codefresh.io/docker-tutorial/node_docker_multistage/
