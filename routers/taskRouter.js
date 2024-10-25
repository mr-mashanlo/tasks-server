import Router from 'express';
import taskController from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();

router.get( '/all', authMiddleware, taskController.getAll );
router.get( '/:id', authMiddleware, taskController.getOne );
router.post( '/create', authMiddleware, taskController.create );
router.put( '/:id', authMiddleware, taskController.update );
router.delete( '/:id', authMiddleware, taskController.delete );

export default router;