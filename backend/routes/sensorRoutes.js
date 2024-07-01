const { Router } = require("express");
const sensorController = require("../controllers/sensorController");

const sensorRoutes = Router();

sensorRoutes.post("/init", sensorController.addNewSensor);

module.exports = sensorRoutes;
