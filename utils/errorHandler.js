const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
    stack: error.stack,
  })
}

module.exports = errorHandler
