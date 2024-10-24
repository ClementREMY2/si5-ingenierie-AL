// models/patient.js
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "Patient",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "doctors",
          key: "id",
        },
      },
      medical_record: DataTypes.TEXT,
    },
    {
      tableName: "patients",
      timestamps: false,
    }
  );

  Patient.associate = function (models) {
    Patient.belongsTo(models.User, { foreignKey: "id", as: "user" });
    Patient.belongsTo(models.User, { foreignKey: "doctor_id", as: "doctor" });
    Patient.belongsToMany(models.Nurse, {
      through: "NursePatient",
      foreignKey: "patient_id",
      otherKey: "nurse_id",
      as: "nurses",
    });
    Patient.belongsToMany(models.Relative, {
      through: "RelativePatient",
      foreignKey: "patient_id",
      otherKey: "relative_id",
      as: "relatives",
    });
  };

  return Patient;
};
