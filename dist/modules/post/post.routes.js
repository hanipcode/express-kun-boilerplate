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
var postController = __importStar(require("./post.controller"));
var express_1 = require("express");
var express_kun_1 = require("express-kun");
var errorHandlerMiddleware_1 = __importDefault(require("../../middlewares/errorHandlerMiddleware"));
var withAuthMiddleware_1 = __importDefault(require("../../routers/withAuthMiddleware"));
var router = express_1.Router();
var errorHandledRouter = express_kun_1.withErrorHandler(router, errorHandlerMiddleware_1.default);
var protectedRouter = withAuthMiddleware_1.default(errorHandledRouter);
errorHandledRouter.get('/', postController.getAll);
protectedRouter.post('/', postController.create);
protectedRouter.get('/:postId', postController.getPost);
protectedRouter.get('/:postId/comments', postController.getComments);
protectedRouter.post('/:postId/comments', postController.comment);
protectedRouter.post('/:postId/comments/:commentId', postController.createSubComment);
protectedRouter.put('/:postId/comments/:commentId/points', postController.upsertPointToComment);
protectedRouter.put('/:postId/points', postController.upsertPoint);
exports.default = router;
//# sourceMappingURL=post.routes.js.map