const notificationsService = require('../services/notificationsService');

exports.getNotifications = async (req, res) => {
    try {
      const notifications = await notificationsService.getAllNotifications();
      res.json(notifications);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  };