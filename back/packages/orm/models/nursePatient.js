// models/nursePatient.js
module.exports = (sequelize, DataTypes) => {
  const NursePatient = sequelize.define(
    "NursePatient",
    {
      nurse_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "nurses",
          key: "id",
        },
      },
      patient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "patients",
          key: "id",
        },
      },
    },
    {
      tableName: "nurses_patients",
      timestamps: false,
    }
  );

  return NursePatient;
};
