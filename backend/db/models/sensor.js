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
      this.hasMany(models.SensorLokasi, {
        foreignKey: "id_sensor",
      });
    }
  }
  Sensor.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      jenis_sensor: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Sensor",
      underscored: true,
    }
  );
  return Sensor;
};
