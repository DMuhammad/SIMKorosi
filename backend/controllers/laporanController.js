const db = require("../db/models");

const Laporan = db.sequelize.models.Laporan;

module.exports = {
  async getLaporan(req, res) {
    const limit = 25;
    const { id_pengguna, page } = req.query;
    try {
      const { count, rows: data } = await Laporan.findAndCountAll({
        where: {
          id_pengguna,
        },
        limit: 25,
        offset: (page - 1) * limit,
      });

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Berhasil mengambil data laporan",
        data,
        pagination: {
          page: parseInt(page),
          limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
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
      if (tanggal_selesai < tanggal_mulai) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "Tanggal akhir harus setelah tanggal awal",
        });
      }

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
  async deleteLaporan(req, res) {
    const { id } = req.params;
    try {
      Laporan.destroy({
        where: {
          id,
        },
      }).then(() => {
        return res.status(200).json({
          status: "success",
          code: 200,
          message: "Berhasil menghapus laporan",
        });
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
