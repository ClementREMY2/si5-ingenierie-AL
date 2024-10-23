const userService = require('../services/usersService');

exports.getUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  };


exports.getUserById = async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  }