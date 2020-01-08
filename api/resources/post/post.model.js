import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'profile',
      required: true,
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true,
    },
  },
  { timestamps: true }
)

postSchema.index({ list: 1, title: 1 }, { unique: true })

const Post = mongoose.model('post', postSchema)

export default Post
