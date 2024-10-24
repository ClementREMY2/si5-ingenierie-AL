// services/doctorsService.js
const { raw } = require("express");
const { User, Doctor, Patient } = require("orm");

exports.getDoctorById = async (id) => {
  try {
    const doctor = await User.findOne({
      where: { id },
      include: [
        {
          model: Doctor,
          as: "doctor",
          attributes: ["specialty"],
        },
      ],
      attributes: { exclude: ["password"] },
    });
    const formattedDoctor = {
      id: doctor.id,
      first_name: doctor.first_name,
      last_name: doctor.last_name,
      email: doctor.email,
      phone: doctor.phone,
      specialty: doctor.doctor.specialty,
    };
    return formattedDoctor;
  } catch (error) {
    console.error("Erreur lors de la récupération du docteur :", error);
    throw error;
  }
};

// payload example: { specialty: "Cardiologue" }
exports.putDoctorId = async (id, payload) => {
  const transaction = await User.sequelize.transaction();
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    await User.update(payload, { where: { id }, transaction });
    if (payload.specialty) {
      await Doctor.update(payload, {
        where: { id },
        transaction,
      });
    }

    const res = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Doctor,
          as: "doctor",
          attributes: ["specialty"],
        },
      ],
      transaction,
    });
    await transaction.commit();
    const formattedDoctor = {
      id: res.id,
      first_name: res.first_name,
      last_name: res.last_name,
      email: res.email,
      phone: res.phone,
      specialty: res.doctor.specialty,
    };
    return formattedDoctor;
  } catch (error) {
    await transaction.rollback();
    console.error("Erreur lors de la mise à jour du docteur :", error);
    throw error;
  }
};

exports.getDoctorPatients = async (id) => {
  try {
    const patients = await Patient.findAll({
      where: { doctor_id: id }, // Récupère tous les patients d'un docteur donné
      include: [
        {
          model: User,
          as: "user", // Alias pour le patient lui-même
          attributes: ["first_name", "last_name", "email", "phone"], // Récupère les informations utilisateur
          required: true, // Cette jointure est obligatoire
        },
      ],
      raw: true, // Mode raw pour avoir les données aplaties
    });

    return patients;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des patients du docteur :",
      error
    );
    throw error;
  }
};
