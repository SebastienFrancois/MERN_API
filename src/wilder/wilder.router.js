const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const wilderControler = require('./wilder.controller')

const router = Router()

function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next)
  }
}

// /api/wilders
router
  .route('/')
  .get(asyncHandler(wilderControler.getMany))
  .post(asyncHandler(wilderControler.createOne))

// /api/wilders/:id
router
  .route('/:id')
  .get(wilderControler.getOne)
  .put(wilderControler.updateOne)
  .delete(wilderControler.removeOne)

module.exports = router
