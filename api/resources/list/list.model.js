import mongoose from 'mongoose'

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
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

listSchema.index({ profile: 1, name: 1 }, { unique: true })

const List = mongoose.model('list', listSchema)

export default List
