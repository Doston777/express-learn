const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CardSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  published: Boolean,
  comments: [{ message: String }],
  meta: {
    votes: Number,
    favs: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('card', CardSchema)