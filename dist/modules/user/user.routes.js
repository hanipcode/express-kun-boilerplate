"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userController = __importStar(require("./user.controller"));
var express_1 = require("express");
var errorHandlerMiddleware_1 = __importDefault(require("../../middlewares/errorHandlerMiddleware"));
var express_kun_1 = require("express-kun");
var userRouter = express_1.Router();
var errorHandledRoute = express_kun_1.withErrorHandler(userRouter, errorHandlerMiddleware_1.default);
errorHandledRoute.post('/', userController.createUser);
errorHandledRoute.post('/login', userController.loginUser);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map