const { Router } = require('express')
const wilderModel = require('./wilder.model')

const Wilder = require('./wilder.model')

const router = Router()

const getMany = async (req, res) => {
  try {
    const wilders = await Wilder.find({}).exec()
    res.status(200).send(wilders)
  } catch ({ message: err }) {
    console.error(err)
    res.status(400).end()
  }
}

const getOne = async (req, res) => {
  try {
    const wilder = await Wilder.findOne({_id: req.params.id}).exec()
    if(!wilder){
        return res.status(404).end()
    }
    console.log(wilder)
    res.status(200).send(wilder)

  } catch ({ message: err }) {
    console.error(err)
    res.status(400).end()
  }
}

const createOne = async (req, res) => {
    try {
        const datas = req.body;
        if(!datas.skills){
            return res.status(400).send({error: 'Bad Request'}).end()
        }
        const wilder = await wilderModel.create({...datas}); 
        res.status(201).send(wilder);
    } catch ({ message: err }) {
        console.error(err)
        res.status(400).end()
    }
}

// /api/wilders
router.route('/').get(getMany).post(createOne)

// /api/wilders/:id
router.route('/:id').get(getOne)

module.exports = router
