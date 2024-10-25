import { Schema, model } from 'mongoose';

const TokenModel = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  AToken: { type: String, require: true },
  RToken: { type: String, require: true }
} );

export default model( 'Token', TokenModel );