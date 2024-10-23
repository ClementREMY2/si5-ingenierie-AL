// models/relative.js
module.exports = (sequelize, DataTypes) => {
  const Relative = sequelize.define(
    "Relative",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: DataTypes.STRING,
    },
    {
      tableName: "relatives",
      timestamps: false,
    }
  );

  Relative.associate = function (models) {
    Relative.belongsTo(models.User, { foreignKey: "id", as: "user" });
    Relative.belongsToMany(models.Patient, {
      through: "RelativePatient",
      foreignKey: "relative_id",
      otherKey: "patient_id",
      as: "patients",
    });
  };

  return Relative;
};
