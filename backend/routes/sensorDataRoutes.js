const { Router } = require("express");
const sensorDataController = require("../controllers/sensorDataController");
const verifyToken = require("../middleware/verifyToken");
const verifySensor = require("../middleware/verifySensor");

const sensorDataRoutes = Router();

sensorDataRoutes.get("/", verifyToken, sensorDataController.getDatas);
sensorDataRoutes.post("/data", verifySensor, sensorDataController.addNewData);

module.exports = sensorDataRoutes;
