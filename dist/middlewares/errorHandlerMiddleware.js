"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NotFoundError_1 = __importDefault(require("../interfaces/NotFoundError"));
var InvalidRequestError_1 = __importDefault(require("../interfaces/InvalidRequestError"));
var yup_1 = require("yup");
var validationWording_1 = __importDefault(require("../constants/validationWording"));
var TrackPackageError_1 = __importDefault(require("../interfaces/TrackPackageError"));
var AccessError_1 = __importDefault(require("../interfaces/AccessError"));
var ExtensionError_1 = __importDefault(require("../interfaces/ExtensionError"));
function errorHandlerMiddleware(err, req, res, next) {
    if (!err) {
        next();
        return;
    }
    if (err instanceof NotFoundError_1.default) {
        res.status(404).json({
            message: err.message,
            error: true
        });
        return;
    }
    if (err instanceof InvalidRequestError_1.default) {
        res.status(400).json({
            message: err.message,
            error: true
        });
        return;
    }
    if (err instanceof yup_1.ValidationError) {
        res.status(400).json({
            message: err.message,
            error: true
        });
        return;
    }
    if (err instanceof ExtensionError_1.default) {
        res.status(400).json({
            message: err.message,
            error: true
        });
        return;
    }
    if (err instanceof AccessError_1.default) {
        res.status(401).json({
            message: err.message,
            error: true
        });
        return;
    }
    if (err instanceof TrackPackageError_1.default) {
        res.status(500).json({
            message: err.message,
            stack: err.stack,
            error: true
        });
        return;
    }
    if (/E11000/gi.test(err.message)) {
        var firstBracket = err.message.split('{')[1];
        var fieldName = firstBracket.split(':')[0];
        var value = firstBracket.split(':')[1].replace(/[\s}]/gi, '');
        res.status(400).json({
            message: validationWording_1.default.duplicate(fieldName, value),
            error: true
        });
        return;
    }
    res.status(500).json({
        message: 'Internal Server Error',
        debugMessage: err.message,
        stack: err.stack,
        error: true
    });
}
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=errorHandlerMiddleware.js.map