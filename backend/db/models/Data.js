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
      this.belongsTo(models.Lokasi, {
        foreignKey: "id_lokasi",
        as: "lokasi",
      });
    }
  }
  Data.init(
    {
      id_sensor_suhu: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      id_sensor_kelembapan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      id_sensor_ph: {
        allowNull: false,
        type: DataTypes.STRING,
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
      id_lokasi: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: "id",
          model: "lokasis",
        },
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
