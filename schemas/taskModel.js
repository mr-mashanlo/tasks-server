const { Schema, model } = require( 'mongoose' );

const TaskModel = new Schema( {
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, require: true },
  completed: { type: Boolean, default: false },
  created: { type: String, default: Date.now() },
  deadline: { type: String },
  folder: { type: String, default: 'default' }
} );

module.exports = model( 'Task', TaskModel );