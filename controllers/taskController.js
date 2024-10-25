import TaskModel from '../schemas/taskModel.js';

class TaskController {

  getAll = async ( req, res, next ) => {
    try {
      const user = req.me.id;
      const tasks = await TaskModel.find( { user } );
      return res.json( tasks );
    } catch ( error ) {
      next( error );
    }
  };

  getOne = async ( req, res, next ) => {
    try {
      const taskID = req.params.id;
      const task = await TaskModel.findOne( { _id: taskID } );
      return res.json( task );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const user = req.me.id;
      const { title, tag, body, status, priority } = req.body;
      const task = await TaskModel.create( { title, tag, body, status, priority, user } );
      return res.json( task );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const { _id, ...body } = req.body;
      const task = await TaskModel.findOneAndUpdate( { _id }, { $set: { ...body } }, { new: true } );
      return res.json( task );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await TaskModel.deleteOne( { _id: id } );
      return res.json( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};

const taskController = new TaskController();

export default taskController;