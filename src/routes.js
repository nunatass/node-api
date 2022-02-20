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

  {
    method: 'POST',
    pathName: '/users',
    handler: UsersController.createUser,
  },

  {
    method: 'PUT',
    pathName: '/users/:id',
    handler: UsersController.updateUser,
  },

  {
    method: 'DELETE',
    pathName: '/users/:id',
    handler: UsersController.deleteUser,
  },
];
