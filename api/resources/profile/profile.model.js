import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import validator from 'validator'

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator(email) {
          return validator.isEmail(email)
        },
        message: () => `Please provide a valid email.`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(password) {
          return password.length > 6
        },
        message: () => `Please provide a password with more than 6 characters.`,
      },
    },
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
    },
  },
  { timestamps: true }
)

profileSchema.pre('save', function(next) {
  // no need to generate a new hash if password is not modified, simply proceed to next middleware.
  if (!this.isModified('password')) return next()

  bcryptjs.hash(this.password, 8, (err, hash) => {
    if (err) return next()

    this.password = hash
    next()
  })
})

profileSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password

  return new Promise((resolve, reject) => {
    bcryptjs.compare(password, passwordHash, (err, isSame) => {
      if (err) return reject(err)

      resolve(isSame)
    })
  })
}

const Profile = mongoose.model('profile', profileSchema)

export default Profile
