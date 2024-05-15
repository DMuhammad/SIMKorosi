const db = require("../db/models");

const Laporan = db.sequelize.models.Laporan;

module.exports = {
  async getLaporan(req, res) {
    const { id_pengguna } = req.query;
    try {
      const data = await Laporan.findAll({
        where: {
          id_pengguna,
        },
      });

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Berhasil mengambil data laporan",
        data,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },
  async addNewLaporan(req, res) {
    const { tanggal_mulai, tanggal_selesai, id_pengguna } = req.body;
    try {
      const laporan = await Laporan.create({
        id_pengguna,
        tanggal_mulai,
        tanggal_selesai,
      });

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Berhasil membuat laporan",
        data: laporan,
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
