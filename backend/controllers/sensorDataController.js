const db = require("../db/models");
const { v4: uuidv4 } = require("uuid");
const socket = require("../utils/socket");

const Data = db.sequelize.models.Data;

module.exports = {
  async getDatas(req, res) {
    const limit = 10;
    const { page } = req.query;
    try {
      const { count, rows: data } = await Data.findAndCountAll({
        order: [["created_at", "DESC"]],
        limit: 10,
        offset: (page - 1) * limit,
        include: ["lokasi"],
      });

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Berhasil mengambil data sensor",
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

  async addNewData(req, res) {
    const {
      id_sensor_suhu,
      id_sensor_kelembapan,
      id_sensor_ph,
      suhu,
      kelembapan,
      ph,
      id_lokasi,
    } = req.body;
    const io = socket.getIO();

    try {
      const data = await Data.create({
        id: uuidv4(),
        id_sensor_suhu,
        id_sensor_kelembapan,
        id_sensor_ph,
        suhu,
        kelembapan,
        ph,
        id_lokasi,
      });

      io.emit("data-baru", data);

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Berhasil menambahkan data sensor",
        data: {
          id: data.id,
          suhu,
          kelembapan,
          ph,
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
};
