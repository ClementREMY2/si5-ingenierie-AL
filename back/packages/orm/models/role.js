// models/role.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "role",
      timestamps: false,
    }
  );

  Role.associate = function (models) {
    Role.hasMany(models.User, { foreignKey: "role_id", as: "users" });
  };

  return Role;
};
