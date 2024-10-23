const doctorsService = require("../services/doctorsService");

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorsService.getDoctorById(req.params.id);
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur");
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorsService.getAllDoctors();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur");
  }
};

exports.putDoctorById = async (req, res) => {
  try {
    const updatedDoctor = await doctorsService.putDoctorId(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur");
  }
};

exports.getDoctorPatients = async (req, res) => {
  try {
    const patients = await doctorsService.getDoctorPatients(req.params.id);
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur du serveur");
  }
};
