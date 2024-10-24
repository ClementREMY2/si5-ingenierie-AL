// models/relativePatient.js
module.exports = (sequelize, DataTypes) => {
  const RelativePatient = sequelize.define(
    "RelativePatient",
    {
      relative_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "relatives",
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
      tableName: "relatives_patients",
      timestamps: false,
    }
  );

  return RelativePatient;
};
