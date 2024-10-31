import { model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

const TaskModel = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  uid: { type: String, default: nanoid( 6 ) },
  tag: { type: String },
  title: { type: String, require: true },
  body: { type: String },
  status: { type: String, default: 'todo' },
  priority: { type: String, default: 'low' },
  created: { type: String, default: Date.now() }
} );

export default model( 'Task', TaskModel );