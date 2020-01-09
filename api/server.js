!process.env.NODE_ENV && require('dotenv').config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import startDatabase from './resources/database/db'
import {
  register,
  login,
  protectedRouter,
} from './resources/utils/authentication'
import profileRouter from './resources/profile/profile.router'
import postRouter from './resources/post/post.router'
import { getPublicPosts } from './resources/home/home.controller'

const app = express()
const PORT = process.env.PORT

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.get('/', getPublicPosts)
app.post('/register', register)
app.post('/login', login)

app.use('/api', protectedRouter)
app.use('/api/profile', profileRouter)
app.use('/api/post', postRouter)

const startApplication = async () => {
  try {
    await startDatabase()
    app.listen(PORT, () => console.log(`Server opened in port ${PORT}!`))
  } catch (error) {
    console.error(error)
  }
}

export { app, startApplication }
