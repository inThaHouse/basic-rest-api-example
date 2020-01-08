!process.env.NODE_ENV && require('dotenv').config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import startDatabase from './resources/database/db'
import { goodStatus } from './resources/utils/constants'
import {
  register,
  login,
  protectedRouter,
} from './resources/utils/authentication'
import profileRouter from './resources/profile/profile.router'
import postRouter from './resources/post/post.router'
import listRouter from './resources/list/list.router'

const app = express()
const PORT = process.env.PORT

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.get('/', (_, res) => {
  res
    .status(goodStatus)
    .json({ message: 'Hello and welcome to my basic api!!!' })
})

app.post('/register', register)
app.post('/login', login)

app.use('/api', protectedRouter)
app.use('/api/profile', profileRouter)
app.use('/api/post', postRouter)
app.use('/api/list', listRouter)

const startApplication = async () => {
  try {
    await startDatabase()
    app.listen(PORT, () => console.log(`Server opened in port ${PORT}!`))
  } catch (error) {
    console.error(error)
  }
}

export { app, startApplication }
