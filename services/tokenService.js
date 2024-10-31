import jwt from 'jsonwebtoken';

import TokenModel from '../schemas/tokenModel.js';

class TokenService {

  generate = payload => {
    const RToken = jwt.sign( payload, process.env.REFRESH_KEY, { expiresIn: process.env.REFRESH_TOKEN_TIMER } );
    const AToken = jwt.sign( payload, process.env.ACCESS_KEY, { expiresIn: process.env.ACCESS_TOKEN_TIMER } );
    return { RToken, AToken };
  };

  create = async payload => {
    const { RToken, AToken } = this.generate( payload );
    const existsToken = await TokenModel.findOne( { user: payload.id } );
    if ( existsToken ) {
      await TokenModel.updateOne( { user: payload.id }, { $set: { AToken, RToken } } );
      return { RToken, AToken };
    } else {
      await TokenModel.create( { user: payload.id, RToken, AToken } );
      return { RToken, AToken };
    }
  };

  async delete( AToken ) {
    const existsToken = await TokenModel.deleteOne( { AToken } );
    return existsToken;
  }

}

const tokenService = new TokenService();

export default tokenService;