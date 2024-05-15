const { Router } = require("express");
const LaporanController = require("../controllers/laporanController");
const verifyToken = require("../middleware/verifyToken");

const laporanRoutes = Router();

laporanRoutes.get("/", verifyToken, LaporanController.getLaporan);
laporanRoutes.post("/create", verifyToken, LaporanController.addNewLaporan);

module.exports = laporanRoutes;
