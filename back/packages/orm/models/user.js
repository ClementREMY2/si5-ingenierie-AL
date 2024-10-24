// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "role",
          key: "id",
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: "role_id", as: "role" });
    User.hasOne(models.Doctor, { foreignKey: "id", as: "doctor" });
    User.hasOne(models.Nurse, { foreignKey: "id", as: "nurse" });
    User.hasOne(models.Patient, { foreignKey: "id", as: "patient" });
    User.hasOne(models.Relative, { foreignKey: "id", as: "relative" });
    User.hasMany(models.Patient, { foreignKey: "doctor_id", as: "patients" });
  };

  return User;
};
