import Router from 'express';

import userController from '../controllers/userController.js';
import authMiddleware from'../middlewares/authMiddleware.js';

const router = new Router();

router.get( '/all', authMiddleware, userController.getAll );
router.get( '/:id', authMiddleware, userController.getOne );
router.put( '/:id', authMiddleware, userController.update );
router.delete( '/:id', authMiddleware, userController.delete );

export default router;