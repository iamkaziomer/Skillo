const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    default: '',
  },
  learntFrom:{
    type: String,
    default: '',
  },

  resources: [
    {
      type: String,
      trim: true,
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);