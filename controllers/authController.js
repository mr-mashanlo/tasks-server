import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import TokenModel from '../schemas/tokenModel.js';
import UserModel from '../schemas/userModel.js';
import { BadRequest } from '../services/errorService.js';
import TokenService from '../services/tokenService.js';

class AuthController {

  signin = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        throw new BadRequest( { type: 'validation', name: errors.errors[0].path, message: errors.errors[0].msg } );
      }

      const user = await UserModel.findOne( { email } );
      if ( !user ) {
        throw new BadRequest( { type: 'validation', name: 'email', message: 'User not found' } );
      }

      const validPassword = bcrypt.compareSync( password, user.password );
      if ( !validPassword ) {
        throw new BadRequest( { type: 'validation', name:'password', message:'Incorrect password' } );
      }

      const tokens = await TokenService.create( { id: user._id } );
      res.cookie( 'AToken', tokens.AToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true } );
      return res.json( { id: user._id, token: tokens.AToken } );
    } catch ( error ) {
      next( error );
    }
  };

  signup = async ( req, res, next ) => {
    try {
      const { email, password, confirm } = req.body;

      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        throw new BadRequest( { type: 'validation', name: errors.errors[0].path, message: errors.errors[0].msg } );
      }

      const candidate = await UserModel.findOne( { email } );
      if ( candidate ) {
        throw new BadRequest( { type: 'validation', name:'email', message: 'Email already exists' } );
      }

      if ( password !== confirm ) {
        throw new BadRequest( { type: 'validation', name: 'confirm', message: 'Passwords do not match' } );
      }

      const hashPassword = bcrypt.hashSync( password, 7 );
      const user = await UserModel.create( { email, password: hashPassword } );
      const tokens = await TokenService.create( { id: user._id } );
      res.cookie( 'AToken', tokens.AToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true } );
      return res.json( { id: user._id, token: tokens.AToken } );
    } catch ( error ) {
      next( error );
    }
  };

  logout = async ( req, res, next ) => {
    try {
      await TokenModel.deleteOne( { user: req.me.id } );
      res.clearCookie( 'AToken' );
      return res.json( { success: true, msg: 'Logouted' } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      await UserModel.deleteOne( { _id: req.me.id } );
      await TokenModel.deleteOne( { user: req.me.id } );
      res.clearCookie( 'AToken' );
      return res.json( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

  token = async ( req, res, next ) => {
    try {
      const { AToken } = req.cookies;
      const tokens = await TokenModel.findOne( { AToken } );
      const updatedTokens = await TokenService.create( { id: tokens.user } );
      res.cookie( 'AToken', updatedTokens.AToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true } );
      return res.json( { id: tokens.user, token: updatedTokens.AToken } );
    } catch ( error ) {
      next( error );
    }
  };

};

const authController = new AuthController();

export default authController;