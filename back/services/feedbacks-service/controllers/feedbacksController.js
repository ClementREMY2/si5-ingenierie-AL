const feedbacksService = require('../services/feedbacksService');

exports.getFeedbacks = async (req, res) => {
    try {
      const feedbacks = await feedbacksService.getAllFeedbacks();
      res.json(feedbacks);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  };