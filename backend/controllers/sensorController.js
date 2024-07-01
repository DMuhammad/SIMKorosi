const db = require("../db/models");
const Sensor = db.sequelize.models.Sensor;

module.exports = {
  async addNewSensor(req, res) {
    const { mac_address, id_lokasi } = req.body;
    try {
      await Sensor.create({
        id: mac_address,
        id_lokasi,
      });

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Berhasil menambahkan sensor",
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
