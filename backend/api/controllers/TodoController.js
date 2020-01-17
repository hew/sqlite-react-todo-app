const Todo = require('../models/Todo');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const TodoController = () => {
  const create = async (req, res) => {
    try {
      const {description, dueDate, state} = req.body;

      const todo = await Todo.create({
        description,
        state,
        dueDate
      });

      return res.status(200).json({todo});
    } catch (err) {
      console.log(err);
      return res.status(500).json({msg: 'Internal server error'});
    }
  };

  const update = async (req, res) => {
    const {description, dueDate, state, id} = req.body;

    try {
      const todo = await Todo.findOne({where: id});

      const updatedTodo = await todo.update({
        description: description,
        state: state,
        dueDate: dueDate
      });

      return res.status(200).json({todo: updatedTodo});
    } catch (err) {
      console.log(err);
      return res.status(500).json({msg: 'Internal server error'});
    }
  };

  const destroy = async (req, res) => {
    const {id} = req.body;

    try {
      const todo = await Todo.findOne({where: id});
      await todo.destroy();

      return res.status(200).json({msg: 'delete successfull'});
    } catch (err) {
      return res.status(500).json({msg: 'Internal server error'});
    }
  };

  const getAll = async (req, res) => {
    try {
      const todos = await Todo.findAll();

      return res.status(200).json({todos});
    } catch (err) {
      console.log(err);
      return res.status(500).json({msg: 'Internal server error'});
    }
  };

  return {
    create,
    update,
    destroy,
    getAll
  };
};

module.exports = TodoController;
