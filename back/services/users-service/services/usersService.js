const { User, Role } = require("orm");
// services/usersService.js

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["name"],
        },
      ],
      order: [["id", "ASC"]],
    });
    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["name"],
        },
      ],
    });
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error;
  }
};
