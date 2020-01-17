const privateRoutes = {
  'GET /users'  : 'UserController.getAll',
  'GET /all'    : 'TodoController.getAll',
  'POST /create': 'TodoController.create',
  'POST /update': 'TodoController.update',
  'POST /delete': 'TodoController.destroy'
};

module.exports = privateRoutes;
