const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BooksSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  },
    in_stock: {
      type: Number,
      required: true,
      default: 0
    },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('books', BooksSchema)