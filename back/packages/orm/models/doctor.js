// models/doctor.js
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    "Doctor",
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
      tableName: "doctors",
      timestamps: false,
    }
  );

  Doctor.associate = function (models) {
    Doctor.belongsTo(models.User, { foreignKey: "id", as: "user" });
  };

  return Doctor;
};
