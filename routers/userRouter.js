const Router = require( 'express' );
const router = new Router();
const userController = require( '../controllers/userController' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/all', authMiddleware, userController.getAll );
router.get( '/:id', authMiddleware, userController.getOne );
router.patch( '/:id', authMiddleware, userController.update );
router.delete( '/:id', authMiddleware, userController.delete );

module.exports = router;