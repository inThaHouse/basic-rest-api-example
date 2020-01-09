import Post from '../post/post.model'
import { goodStatus, badStatus } from '../utils/constants'

const options = {
  createdBy: {
    path: 'createdBy',
    select: 'username',
  },
  public: {
    public: true,
  },
}

export const getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find(options.public)
      .populate(options.createdBy)
      .lean()
      .exec()

    res.status(goodStatus).json({
      greeting:
        'Welcome to a basic rest api example (inthahouse edition hehe 😎)',
      help:
        'See read me for some routes info in https://github.com/inThaHouse/basic-rest-api-example (api docs are still incomplete. Sorry im working on it.)',
      posts,
    })
  } catch (err) {
    console.error(err)
    res.status(badStatus).end()
  }
}
