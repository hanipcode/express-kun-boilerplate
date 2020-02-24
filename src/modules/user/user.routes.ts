import * as userController from './user.controller';
import createErrorHandledRouter from '../../routers/createErrorHandledRouter';

const userRouter = createErrorHandledRouter();

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

export default userRouter;
