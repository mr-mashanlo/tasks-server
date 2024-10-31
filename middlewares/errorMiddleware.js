import { GeneralError } from '../services/errorService.js';

// eslint-disable-next-line no-unused-vars
const errorMiddleware = ( err, req, res, next ) => {
  if ( err instanceof GeneralError ) {
    return res.status( err.getCode() ).json( { code: err.code, type: err.type, name: err.name, message: err.message } );
  }
  return res.status( 500 ).json( err );
};

export default errorMiddleware;