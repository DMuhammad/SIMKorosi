const { Router } = require("express");
const sensorDataController = require("../controllers/sensorDataController");

const sensorDataRoutes = Router();

sensorDataRoutes.get("/", sensorDataController.getDatas);
sensorDataRoutes.post("/data", sensorDataController.addNewData);

module.exports = sensorDataRoutes;
