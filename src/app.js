
import express from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'

const app = express()
app.use(urlencoded({ extended: true, limit: '500mb'}))
app.use(json({ extended: true, limit: '500mb'}))
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello world\n');
});

let server = app.listen(process.env.PORT || 80)
server.setTimeout(500000)

console.log(`Running on port ${process.env.POR || 80}`);