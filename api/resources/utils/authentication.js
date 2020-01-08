import jwt from 'jsonwebtoken'
import Profile from '../profile/profile.model'
import { goodStatus, badStatus } from './constants'

const createNewToken = profile => {
  return jwt.sign({ id: profile.id }, process.env.TOKEN_SECRET, {
    expiresIn: '24h',
  })
}

const checkToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) return reject(err)

      resolve(payload)
    })
  })
}

const register = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res
      .status(badStatus)
      .send({ message: 'Please provide an email and/or password.' })

  try {
    const profile = await Profile.create(req.body)
    const newlyGeneratedToken = createNewToken(profile)

    res.status(goodStatus).send({ newlyGeneratedToken })
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  const invalidJSON = { message: 'lol trying to hack the account of someone?' }

  // if you are missing either email or password
  if (!email || !password) return res.status(badStatus).json(invalidJSON)

  try {
    const profile = await Profile.findOne({ email })
      .select('email password')
      .exec()

    // if profile doesn't exist
    if (!profile) return res.status(badStatus).json(invalidJSON)
    const isPasswordMatching = await profile.checkPassword(password)

    // if password is wrong
    if (!isPasswordMatching) return res.status(badStatus).json(invalidJSON)

    const newToken = createNewToken(profile)

    res.status(goodStatus).json({
      message: 'You are logged in.',
      token: newToken,
    })
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

const protectedRouter = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(badStatus).end()
  }

  const presentedToken = bearer.split('Bearer ')[1].trim()
  let payload

  try {
    payload = await checkToken(presentedToken)
  } catch (err) {
    console.error(err)
    return res.status(badStatus).end()
  }

  const profile = await Profile.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!profile) {
    return res.status(badStatus).end()
  }

  req.profile = profile
  next()
}

export { createNewToken, checkToken, register, protectedRouter, login }
