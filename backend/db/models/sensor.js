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
      this.belongsTo(models.Lokasi, {
        foreignKey: "id_lokasi",
        as: "lokasi",
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
      id_lokasi: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: "id",
          model: "Lokasi",
        },
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
