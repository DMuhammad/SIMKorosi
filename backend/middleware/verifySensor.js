const db = require("../db/models");

const Sensor = db.sequelize.models.Sensor;

const verifySensor = async (req, res, next) => {
  const { id_sensor_suhu, id_sensor_kelembapan, id_sensor_ph } = req.body;

  const ids = [id_sensor_suhu, id_sensor_kelembapan, id_sensor_ph];
  const errors = [];

  const sensor = await Sensor.findAll({
    where: {
      id: {
        [db.Sequelize.Op.in]: ids,
      },
    },
  });

  if (sensor.length === ids.length) {
    next();
  } else {
    const missingIds = ids.filter((id) => !sensor.some((s) => s.id === id));
    missingIds.map((id) => errors.push(`Sensor ${id} tidak valid`));
    res.status(401).json({ errors });
  }
};

module.exports = verifySensor;
