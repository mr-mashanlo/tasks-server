import { Schema, model } from 'mongoose';

const UserModel = new Schema( {
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  fullname: { type: String, default: '' }
} );

export default model( 'User', UserModel );