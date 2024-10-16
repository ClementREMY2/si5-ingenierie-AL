const healthchecksService = require('../services/healthchecksService');

exports.getHealthchecks = async (req, res) => {
    try {
      const users = await healthchecksService.getAllHealthchecks();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  };