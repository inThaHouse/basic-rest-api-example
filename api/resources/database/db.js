import mongoose from 'mongoose'

const startDatabase = (url = process.env.MONGODB_URI) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}

export default startDatabase
