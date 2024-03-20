"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Sensor.hasMany(models.SensorData, {
      //   foreignKey: "id_sensor",
      //   as: "data",
      // });
    }
  }
  Sensor.init(
    {
      tipe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lokasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Sensor",
    }
  );
  return Sensor;
};
