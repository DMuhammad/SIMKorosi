"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lokasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Sensor, {
        foreignKey: "id_lokasi",
        as: "sensor",
      });
    }
  }
  Lokasi.init(
    {
      nama_lokasi: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      geo_x: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      geo_y: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "Lokasi",
      underscored: true,
    }
  );
  return Lokasi;
};
