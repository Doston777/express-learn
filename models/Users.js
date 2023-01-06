const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "{PATH} qismi majburiy. Siz uni kiritmadingiz"],
    maxlength: [20, "{PATH} qismi '{VALUE}' kiritildi. {MAXLENGTH} tadan ko'p bo'lmasligi kerak."],
    minlength: [3, "{PATH} qismi '{VALUE}' kiritildi. {MINLENGTH} tadan kam bo'lmasligi kerak."]
  },
  last_name: { type: String, required: true },
  cards: Array,
  active: { type: Boolean, required: true, default: false},
  cratedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('user', UserSchema)