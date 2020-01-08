import Profile from './profile.model'
import { goodStatus, badStatus } from '../utils/constants'

const getOwnProfile = (req, res) => {
  res.status(goodStatus).json({ data: req.profile })
}

const updateOwnProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.profile._id, req.body, {
      new: true,
    })
      .select('username')
      .exec()

    res.status(goodStatus).json({ data: profile })
  } catch (error) {
    console.error(error)
    res.status(badStatus).end()
  }
}

export { getOwnProfile, updateOwnProfile }
