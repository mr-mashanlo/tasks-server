import TaskModel from '../schemas/taskModel.js';

class TaskController {

  getAll = async ( req, res, next ) => {
    try {
      const user = req.me.id;
      const { limit, skip } = req.query;
      const count = await TaskModel.countDocuments( { user } );
      if ( limit && skip ) {
        const tasks = await TaskModel.find( { user } ).sort( { _id: -1 } ).limit( +limit ).skip( +skip );
        return res.json( { data: tasks, count, limit: +limit, skip: +skip } );
      } else {
        const tasks = await TaskModel.find( { user } ).sort( { _id: -1 } );
        return res.json( { data: tasks, count } );
      }
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
      const createdTask = await TaskModel.create( { title, tag, body, status, priority, user } );
      return res.json( createdTask );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const task = req.body;
      const updatedTask = await TaskModel.findOneAndUpdate( { _id: id }, { $set: task }, { new: true } );
      return res.json( updatedTask );
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