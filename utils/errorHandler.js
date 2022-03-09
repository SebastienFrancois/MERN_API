const errorHandler = (error, req, res, next) => {
  console.log({
    status: error.status || 500,
    message: error.message,
    stack: error.stack,
  })
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
    stack: error.stack,
  })
}

module.exports = errorHandler
