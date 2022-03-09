const { Router } = require('express')
const wilderModel = require('./wilder.model')

const Wilder = require('./wilder.model')

const router = Router()

const wilderInit = async () => await wilderModel.init()

function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next)
  }
}

const getMany = async (req, res) => {
  wilderInit()
  const wilders = await Wilder.find({}).exec()
  res.status(200).send(wilders)
}

const getOne = async (req, res) => {
  wilderInit()
  const wilder = await Wilder.findOne({ _id: req.params.id }, (err) =>
    res.status(404).send('Not found')
  ).exec()
  res.status(200).send(wilder)
}

const createOne = async (req, res) => {
  wilderInit()
  const datas = req.body
  if (!datas.skills && !datas.name) {
    return res.status(400).send({ error: 'Bad Request' }).end()
  }
  const wilder = await wilderModel.create({ ...datas })
  res.status(201).send(wilder)
}

const updateOne = async (req, res) => {
  wilderInit()
  const updated = wilderModel.findByIdAndUpdate(req.params.id, req.body).exec()
  if (!updated) {
    return res.status(400).end()
  }
  res.status(200).json({ data: updated })
}

const removeOne = async (req, res) => {
  wilderInit()
  const removed = await wilderModel
    .findOneAndDelete({
      _id: req.params.id,
    })
    .exec()
  if (!removed) {
    return res.status(400).send({ error: 'Bad request' }).end()
  }
  res.status(200).send({ message: 'Deleted with success' }).end()
}

// /api/wilders
router.route('/').get(runAsyncWrapper(getMany)).post(runAsyncWrapper(createOne))

// /api/wilders/:id
router
  .route('/:id')
  .get(runAsyncWrapper(getOne))
  .put(runAsyncWrapper(updateOne))
  .delete(runAsyncWrapper(removeOne))

module.exports = router
