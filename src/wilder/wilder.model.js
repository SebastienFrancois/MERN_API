const mongoose = require('mongoose')

const WilderSchema = mongoose.Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
  completed: {
    type: String,
    enum: ['in progress', 'complete', 'not started'],
    default: 'in progress',
  },
})

module.exports = mongoose.model('wilder', WilderSchema)
