"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_kun_1 = require("express-kun");
var errorHandlerMiddleware_1 = __importDefault(require("../middlewares/errorHandlerMiddleware"));
function createErrorHandledRouter() {
    var router = express_1.Router();
    return express_kun_1.withErrorHandler(router, errorHandlerMiddleware_1.default);
}
exports.default = createErrorHandledRouter;
//# sourceMappingURL=createErrorHandledRouter.js.map