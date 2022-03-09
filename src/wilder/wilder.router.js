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
  try {
    wilderInit()
    const wilders = await Wilder.find({}).exec()
    res.status(200).send(wilders)
  } catch ({ message: err }) {
    console.error(err)
    res.status(400).end()
  }
}

const getOne = async (req, res, next) => {
  try {
    wilderInit()
    const wilder = await Wilder.findOne({ _id: req.params.id }).exec()
    if (!wilder) {
      return res.status(404).end()
    }

    res.status(200).send(wilder)
  } catch ({ message: err }) {
    next(err)
    // console.error(err)
    // res.status(400).end()
  }
}

const createOne = async (req, res, next) => {
  async function runAsync() {
    wilderInit()
    const datas = req.body
    if (!datas.skills && !datas.name) {
      return res.status(400).send({ error: 'Bad Request' }).end()
    }
    const wilder = await wilderModel.create({ ...datas })
    res.status(201).send(wilder)
  }
  runAsync().catch(next)
}

const updateOne = async (req, res) => {
  try {
    wilderInit();
    const updated = wilderModel
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .exec()

    if (!updated) {
      return res.status(400).end()
    }
    res.status(200).json({ data: updated })
  } catch (err) {
    console.error(err)
    res.status(400).send({ error: 'Bad request' }).end()
  }
}

const removeOne = async (req, res) => {
  try {
    wilderInit();
    const removed = await wilderModel
      .findOneAndDelete({
        _id: req.params.id,
      })
      .exec()

    if (!removed) {
      return res.status(400).send({ error: 'Bad request' }).end()
    }

    res.status(200).send({ message: 'Deleted with success' }).end()
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: 'Bad request' }).end()
  }
}

// /api/wilders
router.route('/').get(getMany).post(createOne)

// /api/wilders/:id
router.route('/:id').get(getOne).put(updateOne).delete(removeOne)

module.exports = router
