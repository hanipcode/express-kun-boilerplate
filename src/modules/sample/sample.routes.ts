import * as sampleController from './sample.controller';
import withAuthMiddleware from '../../routers/withAuthMiddleware';
import { Router } from 'express';
import withErrorHandlerRoute from '../../routers/withErrorHandlerRoute';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRouter = withErrorHandlerRoute(protectedRouter);

/**
 * @swagger
 *
 * /samples:
 *   get:
 *     tags: ['Sample']
 *     summary: Get All Sample
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 */
errorHandledRouter.get('/', sampleController.getAll);

/**
 * @swagger
 *
 * /samples:
 *   post:
 *     tags: ['Sample']
 *     summary: Create Sample
 *     description: Create Sample
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: sampleId
 *         in: formData
 *         required: true
 *         type: string
 *       - name: distributor
 *         in: formData
 *         required: true
 *         type: string
 *       - name: customer
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lubricantLife
 *         in: formData
 *         required: true
 *         type: string
 *       - name: equipmentLife
 *         in: formData
 *         required: true
 *         type: string
 *       - name: drawnDate
 *         in: formData
 *         required: true
 *         type: string
 *         format: date
 *         example: "YYYY-MM-DD"
 *       - name: topUpVolume
 *         in: formData
 *         required: true
 *         type: number
 *       - name: sampleType
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
errorHandledRouter.post('/', sampleController.create);

/**
 * @swagger
 *
 * /samples/{sampleId}:
 *   delete:
 *     tags: ['Sample']
 *     summary: Delete Sample by id
 *     security:
 *       - jwt: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: sampleId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
errorHandledRouter.delete('/:sampleId', sampleController.deleteById);

export default router;
