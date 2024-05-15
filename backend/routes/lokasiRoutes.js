const { Router } = require("express");
const lokasiController = require("../controllers/lokasiController");

const lokasiRoutes = Router();

lokasiRoutes.get("/", lokasiController.getLocations);

module.exports = lokasiRoutes;
