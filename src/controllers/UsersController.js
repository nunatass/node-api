const users = require('../mocks/users');

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
};
