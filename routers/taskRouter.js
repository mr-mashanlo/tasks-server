const Router = require( 'express' );
const router = new Router();
const taskController = require( '../controllers/taskController' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/all', authMiddleware, taskController.getAll );
router.get( '/:id', authMiddleware, taskController.getOne );
router.post( '/create', authMiddleware, taskController.create );
router.put( '/:id', authMiddleware, taskController.update );
router.delete( '/:id', authMiddleware, taskController.delete );

module.exports = router;