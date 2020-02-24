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
var createErrorHandledRouter_1 = __importDefault(require("../../routers/createErrorHandledRouter"));
var userRouter = createErrorHandledRouter_1.default();
/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags: ['User']
 *     summary: Create User
 *     description: Create User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's Email
 *         in: formData
 *         required: true
 *         type: string
 *         default: ha@kagvu.ma
 *       - name: password
 *         description: User's Password.
 *         in: formData
 *         required: true
 *         type: string
 *        - name: name
 *         description: User's Name
 *         in: formData
 *         required: true
 *         type: string
 *         - name: role
 *         description: User's role
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
userRouter.post('/', userController.createUser);
/**
 * @swagger
 *
 * /users/login:
 *   post:
 *     tags: ['User']
 *     summary: User Login
 *     description: User login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's Email
 *         in: formData
 *         required: true
 *         type: string
 *         default: ha@kagvu.ma
 *       - name: password
 *         description: User's Password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
userRouter.post('/login', userController.loginUser);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map