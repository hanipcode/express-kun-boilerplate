"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uriByEnv = {
    test: 'mongodb://localhost:27017/shellTest',
    local: process.env.MONGODB_URI || 'mongodb://localhost:27017/shell'
};
var ENV = process.env.ENV;
var uri = ENV === 'test' ? uriByEnv.test : uriByEnv.local;
var initDB = function () {
    return mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false
    }, function (err) {
        if (err) {
            console.log(err.message);
            throw new Error('Error Connecting to Database');
        }
    });
};
exports.default = initDB;
//# sourceMappingURL=initDB.js.map