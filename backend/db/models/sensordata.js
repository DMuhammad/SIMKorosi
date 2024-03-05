"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SensorData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SensorData.hasOne(models.Indication, {
        foreignKey: "id_sensordata",
        as: "indication",
      });
    }
  }
  SensorData.init(
    {
      suhu: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      kelembapan: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      ph: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      lokasi: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SensorData",
    }
  );
  return SensorData;
};
