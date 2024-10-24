require("dotenv").config();

const express = require("express");
const usersController = require("./controllers/usersController");
const doctorsController = require("./controllers/doctorsController");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", usersController.getUsers);

app.get("/users/:id", usersController.getUserById);

app.get("/users/doctors/:id", doctorsController.getDoctorById);

app.put("/users/doctors/:id", doctorsController.putDoctorById);

app.get("/users/doctors/:id/patients", doctorsController.getDoctorPatients);

app.listen(port, () => {
  console.log(`Users service listening on port ${port}`);
});
