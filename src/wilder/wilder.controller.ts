import { Request, Response, NextFunction } from 'express'
import { WilderModel, Skill } from './wilder.model'
import _ from 'lodash'

const getMany = async (req: Request, res: Response, next: NextFunction) => {
  const wilders = await WilderModel.find({}).exec()
  if (wilders.length <= 0) {
    return next({
      status: 418,
      message: "I'm a teapot",
    })
  }
  return res.status(200).send(wilders)
}

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wilder = await WilderModel.findOne({ _id: req.params.id }).exec()
    return res.status(200).send(wilder)
  } catch (err) {
    return next({ status: 404, message: 'Not Found' })
  }
}

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  const datas = req.body
  if (!datas.name) {
    return next({ status: 400, message: 'skills and name are required !' })
  }
  const wilder = await WilderModel.create({ ...datas })
  return res.status(201).send(wilder)
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  if (_.isEmpty(req.body)) {
    return next({ status: 400, message: 'Mauvaise requête' })
  }

  const id = req.params.id

  // Retrieve and update skills
  try {
    const wilderInDB = await WilderModel.findOne({ _id: id }).exec()
    if (req.body.skills && wilderInDB) {
      const newSkills = req.body.skills
      let wilderSkills = wilderInDB.skills || []
      newSkills.forEach((e: Skill) => {
        wilderSkills = wilderSkills.filter((y) => y.title !== e.title)
        wilderSkills.push(e)
      })
      req.body.skills = wilderSkills
    }
  } catch (err) {
    return next({ status: 400, message: err })
  }

  const updateWilder = await WilderModel.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  ).exec()

  return res.status(200).json(updateWilder)
}

const removeOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await WilderModel.findOneAndDelete({
      _id: req.params.id,
    }).exec()
    return res.status(200).send({ message: 'Deleted with success' }).end()
  } catch (err: any) {
    return next({ status: '400', message: err.message })
  }
}

export default {
  getMany,
  getOne,
  createOne,
  updateOne,
  removeOne,
}
