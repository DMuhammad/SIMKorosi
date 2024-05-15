const { Router } = require("express");
const sensorDataController = require("../controllers/sensorDataController");
const verifyToken = require("../middleware/verifyToken");
const verifySensor = require("../middleware/verifySensor");

const sensorDataRoutes = Router();

sensorDataRoutes.get("/", verifyToken, sensorDataController.getData);
sensorDataRoutes.get(
  "/charts",
  verifyToken,
  sensorDataController.getDataCharts
);
sensorDataRoutes.post("/create", verifySensor, sensorDataController.addNewData);

module.exports = sensorDataRoutes;
