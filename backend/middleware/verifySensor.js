const db = require("../db/models");

const Sensor = db.sequelize.models.Sensor;

const verifySensor = async (req, res, next) => {
  const { id_sensor } = req.body;

  const sensor = await Sensor.findAll({
    where: {
      id: id_sensor,
    },
  });

  if (sensor) {
    next();
  } else {
    res.status(401).json({ error: `Sensor ${id_sensor} tidak valid` });
  }
};

module.exports = verifySensor;
