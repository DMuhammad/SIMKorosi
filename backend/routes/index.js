const express = require("express");
const userRoutes = require("./userRoutes");
const sensorDataRoutes = require("./sensorDataRoutes");

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/korosi", sensorDataRoutes);

module.exports = router;
