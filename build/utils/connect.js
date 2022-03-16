"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/wilderdb', {
            autoIndex: true,
        });
        console.log('Connected to database');
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = connect;