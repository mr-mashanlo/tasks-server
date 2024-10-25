import Router from 'express';
import { check } from 'express-validator';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();

router.post( '/signin', [ check( 'email', 'Invalid email address' ).isEmail(), check( 'password', 'Invalid password' ).isLength( { min: 6 } ) ], authController.signin );
router.post( '/signup', [ check( 'email', 'Invalid email address' ).isEmail(), check( 'password', 'Invalid password' ).isLength( { min: 6 } ) ], authController.signup );
router.get( '/logout', authMiddleware, authController.logout );
router.delete( '/delete', authMiddleware, authController.delete );
router.get( '/token', authController.token );

export default router;