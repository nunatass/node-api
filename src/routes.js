const UsersController = require('./controllers/UsersController');

module.exports = [
  {
    method: 'GET',
    pathName: '/users',
    handler: UsersController.listUsers,
  },

  {
    method: 'GET',
    pathName: '/users/:id',
    handler: UsersController.getUserById,
  },
];
