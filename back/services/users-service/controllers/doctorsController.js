const doctorsService = require('../services/doctorsService');   

exports.getDoctorById = async (req, res) => {
    try {
      const doctor = await doctorsService.getDoctorById(req.params.id);
      res.json(doctor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  }

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorsService.getAllDoctors();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur du serveur');
  }
}