import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    public: {
      type: Boolean,
      default: true,
    },
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'profile',
      required: true,
    },
  },
  { timestamps: true }
)

postSchema.index({ profile: 1, title: 1 }, { unique: true })

const Post = mongoose.model('list', postSchema)

export default Post
