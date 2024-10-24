const Sequelize = require("sequelize");
const config = require("./config/config.js");
const UserModel = require("./models/user");
const RoleModel = require("./models/role");
const DoctorModel = require("./models/doctor");
const NurseModel = require("./models/nurse");
const PatientModel = require("./models/patient");
const RelativeModel = require("./models/relative");
const NursePatientModel = require("./models/nursePatient");
const RelativePatientModel = require("./models/relativePatient");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

console.log(dbConfig);
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }
);

const db = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize, Sequelize.DataTypes),
  Role: RoleModel(sequelize, Sequelize.DataTypes),
  Doctor: DoctorModel(sequelize, Sequelize.DataTypes),
  Nurse: NurseModel(sequelize, Sequelize.DataTypes),
  Patient: PatientModel(sequelize, Sequelize.DataTypes),
  Relative: RelativeModel(sequelize, Sequelize.DataTypes),
  NursePatient: NursePatientModel(sequelize, Sequelize.DataTypes),
  RelativePatient: RelativePatientModel(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
