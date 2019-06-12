
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
  res.send('Diego Cao: Hello')
});

let server = app.listen(process.env.PORT || 8080)
server.setTimeout(500000)