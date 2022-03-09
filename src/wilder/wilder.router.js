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
  .get(asyncHandler(wilderControler.getOne))
  .put(asyncHandler(wilderControler.updateOne))
  .delete(asyncHandler(wilderControler.removeOne))

module.exports = router
