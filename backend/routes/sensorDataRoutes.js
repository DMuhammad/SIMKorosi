const { Router } = require("express");
const sensorDataController = require("../controllers/sensorDataController");
const verifyToken = require("../middleware/verifyToken");

const sensorDataRoutes = Router();

sensorDataRoutes.get("/", verifyToken, sensorDataController.getDatas);
sensorDataRoutes.post("/data", sensorDataController.addNewData);

module.exports = sensorDataRoutes;
