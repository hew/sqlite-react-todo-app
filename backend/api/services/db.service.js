const database = require('../../config/database');
const User = require('../models/User');
const Todo = require('../models/Todo');

const dbService = (environment) => {
  const authenticateDB = () => database.authenticate();
  const dropDB = () => database.drop();
  const syncDB = () => database.sync();

  const successfulDBStart = () =>
    console.info('connection to the database has been established successfully');

  const prepopulate = async () => {
    const user = await User.create({
      email: 'user01',
      password: 'superdupersecure01'
    });

    console.log('Prepopulated user:', user.toJSON());

    const todo1 = await Todo.create({
      description: `gotta do 1`,
      state: 'TODO',
      dueDate: new Date(2020, 0, 22)
    });

    console.log('Prepopulated Todo:', todo1.toJSON());

    const todo2 = await Todo.create({
      description: `gotta do 2`,
      state: 'TODO',
      dueDate: new Date(2020, 0, 22)
    });

    console.log('Prepopulated Todo:', todo2.toJSON());
  };

  const errorDBStart = (err) => console.info('unable to connect to the database:', err);

  const wrongEnvironment = () => {
    console.warn(
      `only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`
    );
    return process.exit(1);
  };

  const startDB = async () => {
    try {
      await dropDB();
      await syncDB();
      await prepopulate();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      return startDB();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startTest = async () => {
    try {
      await authenticateDB();
      await startDB();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const start = async () => {
    switch (environment) {
      case 'development':
        await startDev();
        break;
      case 'testing':
        await startTest();
        break;
      default:
        wrongEnvironment();
    }
  };

  return {
    start
  };
};

module.exports = dbService;
