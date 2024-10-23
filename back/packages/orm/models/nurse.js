// models/nurse.js
module.exports = (sequelize, DataTypes) => {
  const Nurse = sequelize.define(
    "Nurse",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      specialty: DataTypes.STRING,
    },
    {
      tableName: "nurses",
      timestamps: false,
    }
  );

  Nurse.associate = function (models) {
    Nurse.belongsTo(models.User, { foreignKey: "id", as: "user" });
    Nurse.belongsToMany(models.Patient, {
      through: "NursePatient",
      foreignKey: "nurse_id",
      otherKey: "patient_id",
      as: "patients",
    });
  };

  return Nurse;
};
