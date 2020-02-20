"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_kun_1 = require("express-kun");
var keys_1 = __importDefault(require("../constants/keys"));
function withAuthMiddleware(router) {
    return express_kun_1.withJWTAuthMiddleware(router, keys_1.default.secretKey);
}
exports.default = withAuthMiddleware;
//# sourceMappingURL=withAuthMiddleware.js.map