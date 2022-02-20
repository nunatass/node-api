let users = require('../mocks/users');

module.exports = {
  listUsers: (request, response) => {
    const { order } = request.query;

    const sortedUsers = users.sort((currentUser, nextUser) => {
      if (order === 'desc') {
        return currentUser.id < nextUser.id ? 1 : -1;
      }
      return currentUser.id > nextUser.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },

  getUserById: (request, response) => {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.send(404, { error: 'User not found' });
      return;
    }

    response.send(200, user);
  },

  createUser: (request, response) => {
    const { name } = request.body;
    const id = users.length + 1;

    const newUser = {
      id,
      name,
    };

    users.push(newUser);

    response.send(201, newUser);
  },

  updateUser: (request, response) => {
    const { id } = request.params;
    const { name } = request.body;

    const userToUpdate = users.find((user) => user.id === Number(id));

    if (!userToUpdate) {
      response.send(404, { error: 'User not found' });
      return;
    }

    users = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...userToUpdate,
          name,
        };
      }
      return user;
    });

    response.send(200, { ...userToUpdate, name });
  },

  deleteUser: (request, response) => {
    const { id } = request.params;

    const userToDelete = users.find((user) => user.id === Number(id));

    if (!userToDelete) {
      response.send(404, { error: 'User not found' });
      return;
    }

    users = users.filter((user) => user.id !== Number(id));

    response.send(200, { ...userToDelete, deleted: true });
  },
};
