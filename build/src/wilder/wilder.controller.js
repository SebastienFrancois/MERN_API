"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wilder_model_1 = require("./wilder.model");
const lodash_1 = __importDefault(require("lodash"));
const getMany = async (req, res, next) => {
    const wilders = await wilder_model_1.WilderModel.find({}).exec();
    if (wilders.length <= 0) {
        return next({
            status: 418,
            message: "I'm a teapot",
        });
    }
    return res.status(200).send(wilders);
};
const getOne = async (req, res, next) => {
    try {
        const wilder = await wilder_model_1.WilderModel.findOne({ _id: req.params.id }).exec();
        return res.status(200).send(wilder);
    }
    catch (err) {
        return next({ status: 404, message: 'Not Found' });
    }
};
const createOne = async (req, res, next) => {
    const datas = req.body;
    if (!datas.name) {
        return next({ status: 400, message: 'skills and name are required !' });
    }
    const wilder = await wilder_model_1.WilderModel.create({ ...datas });
    return res.status(201).send(wilder);
};
const updateOne = async (req, res, next) => {
    if (lodash_1.default.isEmpty(req.body)) {
        return next({ status: 400, message: 'Mauvaise requête' });
    }
    const id = req.params.id;
    // Retrieve and update skills
    try {
        const wilderInDB = await wilder_model_1.WilderModel.findOne({ _id: id }).exec();
        if (req.body.skills && wilderInDB) {
            const newSkills = req.body.skills;
            let wilderSkills = wilderInDB.skills || [];
            newSkills.forEach((e) => {
                wilderSkills = wilderSkills.filter((y) => y.title !== e.title);
                wilderSkills.push(e);
            });
            req.body.skills = wilderSkills;
        }
    }
    catch (err) {
        return next({ status: 400, message: err });
    }
    const updateWilder = await wilder_model_1.WilderModel.findByIdAndUpdate({ _id: id }, req.body, { new: true }).exec();
    return res.status(200).json(updateWilder);
};
const removeOne = async (req, res, next) => {
    try {
        await wilder_model_1.WilderModel.findOneAndDelete({
            _id: req.params.id,
        }).exec();
        return res.status(200).send({ message: 'Deleted with success' }).end();
    }
    catch (err) {
        return next({ status: '400', message: err.message });
    }
};
exports.default = {
    getMany,
    getOne,
    createOne,
    updateOne,
    removeOne,
};
