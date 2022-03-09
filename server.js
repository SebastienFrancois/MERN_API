const express = require('express')
const connect = require('./utils/connect')
const morgan = require('morgan')
const fs = require('fs')
const WilderRouter = require('./src/wilder/wilder.router')
const errorHandler = require('./utils/errorHandler')

const app = express()

// Database connection
connect()

const log = (req, res, next) => {
  console.log("You've just logged in !")
  next()
}
// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(log)
app.use(morgan('dev'))

// Routes
app.use('/api/wilder', WilderRouter)
app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next({ status: 404, message: err.toString(), stack: err.stack }) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

// Error handler
app.use(errorHandler)

app.listen(5000, () => console.log('Server started on 5000'))
