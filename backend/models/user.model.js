const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
  
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  bio:{
    type:String,
    default:"",
    maxLength:150
  },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  
    branch: {
      type: String,
      required: true,
    },
  
    semester: {
      type: String,
      required: true,
      min: 1,
      max: 8,
    },
  
  }, { timestamps: true });


const User = mongoose.model('User', userSchema)

module.exports = User