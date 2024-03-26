"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SensorLokasi extends Model {
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
      this.belongsTo(models.Lokasi, {
        foreignKey: "id_lokasi",
        as: "lokasi",
      });
    }
  }
  SensorLokasi.init(
    {
      id_sensor: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          key: "id",
          model: "Sensor",
        },
      },
      id_lokasi: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "SensorLokasi",
      underscored: true,
    }
  );
  return SensorLokasi;
};
