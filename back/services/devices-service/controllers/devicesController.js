const devicesService = require('../services/devicesService');

exports.getDevices = async (req, res) => {
    try {
      const devices = await devicesService.getAllDevices();
      res.json(devices);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  };