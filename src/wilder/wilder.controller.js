const { isEmpty } = require('lodash')
const wilderModel = require('./wilder.model')

const wilderInit = async () => await wilderModel.init()

const getMany = async (req, res, next) => {
  wilderInit()
  const wilders = await wilderModel.find({}).exec()
  if (wilders.length <= 0) {
    return next({
      status: 418,
      message: "I'm a teapot",
    })
  }
  res.status(200).send(wilders)
}

const getOne = async (req, res, next) => {
  wilderInit()
  try {
    const wilder = await wilderModel.findOne({ _id: req.params.id }).exec()
    res.status(200).send(wilder)
  } catch (err) {
    next({ status: 404, message: 'Not Found' })
  }
}

const createOne = async (req, res, next) => {
  wilderInit()
  const datas = req.body
  if (!datas.skills && !datas.name) {
    return next({ status: 400, message: 'skills and name are required !' })
  }
  const wilder = await wilderModel.create({ ...datas })
  res.status(201).send(wilder)
}

const updateOne = async (req, res, next) => {
  wilderInit()
  const updated = wilderModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
  if (isEmpty(updated)) {
    return next({ status: 400, message: 'Mauvaise requête' })
  }
  res.status(200).json({ data: updated })
  const updateWilder = await wilderModel.findByIdAndUpdate(
    {_id: req.params.id}, 
    req.body,
    {new: true}
    )
  res.status(200).json(updateWilder)
}


const removeOne = async (req, res, next) => {
  wilderInit()
  try {
    const removed = await wilderModel
      .findOneAndDelete({
        _id: req.params.id,
      })
      .exec()
    res.status(200).send({ message: 'Deleted with success' }).end()
  } catch (err) {
    next({ status: '400', message: err.message })
  }
}

module.exports = {
  getMany,
  getOne,
  createOne,
  updateOne,
  removeOne,
}
