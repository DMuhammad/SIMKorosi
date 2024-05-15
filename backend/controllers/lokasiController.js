const db = require("../db/models");

const Lokasi = db.sequelize.models.Lokasi;

module.exports = {
  async getLocations(req, res) {
    try {
      const locations = await Lokasi.findAll();

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Berhasil mengambil data lokasi",
        data: locations,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },
};
