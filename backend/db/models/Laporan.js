"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "id_pengguna",
        as: "pengguna",
      });
    }
  }
  Laporan.init(
    {
      id_pengguna: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          key: "id",
          model: "User",
        },
      },
      tanggal_mulai: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      tanggal_selesai: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Laporan",
      underscored: true,
    }
  );
  return Laporan;
};
