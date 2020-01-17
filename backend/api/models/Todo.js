const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const sequelize = require('../../config/database');

const tableName = 'todos';
const hooks = { beforeCreate(_todo) { /* run hooks if needed */ } };

const Todo = sequelize.define('Todo', {
  state: {
    type: Sequelize.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
  },
  description: {
    type: Sequelize.STRING,
  },
  dueDate: {
    type: Sequelize.DATE,
  },
}, { hooks, tableName });

module.exports = Todo;
