const TaskModel = require( '../schemas/taskModel' );

class TaskController {

  getAll = async ( req, res, next ) => {
    try {
      const myID = req.me.id;
      const tasks = await TaskModel.find( { author: myID } );
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
      const author = req.me.id;
      const { body, folder } = req.body;
      const task = await TaskModel.create( { author, body, folder } );
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

module.exports = taskController;