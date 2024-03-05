"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Indication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Indication.belongsTo(models.SensorData, {
        foreignKey: "id_sensordata",
        as: "sensordata",
      });
    }
  }
  Indication.init(
    {
      id_sensordata: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      indikasi: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tingkat_korosi: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Indication",
    }
  );
  return Indication;
};
