# Nginx, Docker/multi-composers, Pm2, Cluster, Nodejs, Babel and ES6

This is an essential example to build docker with multi composers, pm2, nodejs/es6, nginx an cluster.

Step to run
1. Clone the [repo](https://github.com/diegothucao/multi-composers-pm2-cluster-nginx-nodejs-es6)
2. Run development mode `docker-compose -f docker-compose.dev.yml up --build` or Production mode `docker-compose -f docker-compose.prod.yml up --build`
4. Test [development](http://localhost) or [production](http://localhost)

create basic node 
```javascript 
import express from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'

dotenv.load()
const app = express()
app.use(urlencoded({ extended: true, limit: '500mb'}))
app.use(json({ extended: true, limit: '500mb'}))
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello world\n')
});

let server = app.listen(process.env.PORT)
server.setTimeout(500000)

console.log(`Running on port ${process.env.PORT}`)
```

Multi target 

```python
FROM node:10 as base
RUN mkdir -p /usr/src/appny
WORKDIR /usr/src/app
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
      PORT: 8080,
      NODE_ENV: 'development'
    },
    env_production : {
      name : 'diego-pro',
      PORT: 8081,
      NODE_ENV: 'production'
    }
  }]
}
```
	
If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks
	
references
 1. https://facebook.github.io/react-native/docs/tutorial	
 2. https://github.com/jscomplete/react-native-essential-training
 3. https://codefresh.io/docker-tutorial/node_docker_multistage/
