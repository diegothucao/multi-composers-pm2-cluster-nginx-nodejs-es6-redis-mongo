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
  const { key } = req.params
  await redisClient.setAsync(key, "Thu CAO")
  return res.send('Data is stored to Redis to the key: ' + key)
})

// get data from Redis 
app.get('/:key', async (req, res) => {
  const { key } = req.params
  const rawData = await redisClient.getAsync(key)
  return res.send('The data is: '  + rawData)
})

let server = app.listen(process.env.PORT || 8080)
server.setTimeout(500000)