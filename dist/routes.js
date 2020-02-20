"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = __importDefault(require("./modules/user/user.routes"));
var post_routes_1 = __importDefault(require("./modules/post/post.routes"));
var apiRouter = express_1.Router();
apiRouter.use('/users', user_routes_1.default);
apiRouter.use('/posts', post_routes_1.default);
function useApiRouter(app) {
    app.use('/api/v1', apiRouter);
}
exports.default = useApiRouter;
//# sourceMappingURL=routes.js.map