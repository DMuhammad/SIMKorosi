"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Sensor, {
        foreignKey: "id_sensor",
        as: "sensor",
      });
    }
  }
  Data.init(
    {
      id_sensor: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          key: "id",
          model: "Sensor",
        },
      },
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
      indikasi: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      tingkat_keparahan: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Data",
      underscored: true,
    }
  );
  return Data;
};
