const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username already exists']
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'email already exists']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: "https://ik.imagekit.io/6v2va7nt5/Facebook-collection/f782c8360e890a8d488eeda004b26bde.jpg"
  },
  bio: String,


}, { timestamps: true })
const UserModel = mongoose.model('fbusers', userSchema)
module.exports = UserModel