"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wilder_controller_1 = __importDefault(require("./wilder.controller"));
const asyncHandler = require('express-async-handler');
const router = (0, express_1.Router)();
// /api/wilders
router
    .route('/')
    .get(asyncHandler(wilder_controller_1.default.getMany))
    .post(asyncHandler(wilder_controller_1.default.createOne));
// /api/wilders/:id
router
    .route('/:id')
    .get(asyncHandler(wilder_controller_1.default.getOne))
    .put(asyncHandler(wilder_controller_1.default.updateOne))
    .delete(asyncHandler(wilder_controller_1.default.removeOne));
exports.default = router;
