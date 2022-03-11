const _ = require('lodash')
const mongoose = require('mongoose');
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
  if (!datas.name) {
    return next({ status: 400, message: 'skills and name are required !' })
  }
  const wilder = await wilderModel.create({ ...datas })
  res.status(201).send(wilder)
}

const updateOne = async (req, res, next) => {
  wilderInit()
  if (_.isEmpty(req.body)) {
    return next({ status: 400, message: 'Mauvaise requête' })
  }

  const id = req.params.id;

  // Retrieve and update skills
  try {
    const wilderInDB = await wilderModel.findOne({ _id: id }).exec()
    if (req.body.skills) {
      const newSkills = req.body.skills
      let wilderSkills = wilderInDB.skills
      newSkills.forEach((e) => {
        wilderSkills = wilderSkills.filter((y) => y.title !== e.title)
        wilderSkills.push(e)
      })
      req.body.skills = wilderSkills
    }
  } catch (err) {
    return next({ status: 400, message: err })
  }
  // 2 manière de faire
  // 1 - retrieve

  // const wilder = await wilderModel.findOne({_id: id});
  // wilder.skills = req.body.skills
  // const updated = await wilder.save();
  // return res.status(200).send(updated);

  // 2 - directly modify it in DB

  const updateWilder = await wilderModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .exec()

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
