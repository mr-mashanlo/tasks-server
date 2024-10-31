import jwt from 'jsonwebtoken';
import { MongooseError } from 'mongoose';

import TokenModel from '../schemas/tokenModel.js';
import { Expired, Unauthorized } from '../services/errorService.js';

const { JsonWebTokenError } = jwt;

const authMiddleware = async ( req, res, next ) => {
  try {
    const AToken = req.cookies.AToken;
    const tokens = await TokenModel.findOne( { AToken } );
    jwt.verify( tokens.RToken, process.env.REFRESH_KEY );
    jwt.verify( AToken, process.env.ACCESS_KEY );
    req.me = { id: tokens.user };
    next();
  } catch ( error ) {
    if ( error instanceof MongooseError ) {
      return next( new Unauthorized( { type: 'token', name: 'token', message:'Your token not found' } ) );
    } else if ( error instanceof JsonWebTokenError ) {
      return next( new Expired( { type: 'token', name: 'expired', message:'Your token has expired' } ) );
    }
    return next( error );
  }
};

export default authMiddleware;