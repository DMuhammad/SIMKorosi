const express = require("express");
const userRoutes = require("./userRoutes");
const sensorDataRoutes = require("./sensorDataRoutes");
const lokasiRoutes = require("./lokasiRoutes");
const laporanRoutes = require("./laporanRoutes");

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/korosi", sensorDataRoutes);
router.use("/lokasi", lokasiRoutes);
router.use("/laporan", laporanRoutes);

module.exports = router;
