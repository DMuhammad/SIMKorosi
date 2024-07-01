const express = require("express");
const userRoutes = require("./userRoutes");
const sensorDataRoutes = require("./sensorDataRoutes");
const lokasiRoutes = require("./lokasiRoutes");
const laporanRoutes = require("./laporanRoutes");
const sensorRoutes = require("./sensorRoutes");

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/korosi", sensorDataRoutes);
router.use("/lokasi", lokasiRoutes);
router.use("/laporan", laporanRoutes);
router.use("/sensor", sensorRoutes);

module.exports = router;
