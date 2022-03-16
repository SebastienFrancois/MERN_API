import mongoose from 'mongoose'

export default async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/wilderdb', {
      autoIndex: true,
    })
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}
