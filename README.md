# multi-composers-nodejs
This is an essential example to build docker with multi composers and nodejs

Step to run
1. Clone the [repo](https://github.com/diegothucao/multi-composers-nodejs)
2. Ro run Dev mod `docker-compose -f docker-compose.yml -f docker-compose.dev.yml --build`
2. Ro run Pro mode `docker-compose -f docker-compose.yml -f docker-compose.prod.yml --build`

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

If you see any issue, please do not hesitate to create an issue here or can contact me via email cao.trung.thu@gmail.com or [Linkedin](https://www.linkedin.com/in/diegothucao/)

Thanks
	
references
 1. https://facebook.github.io/react-native/docs/tutorial	
 2. https://github.com/jscomplete/react-native-essential-training
 3. https://codefresh.io/docker-tutorial/node_docker_multistage/
