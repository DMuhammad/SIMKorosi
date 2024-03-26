"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("data", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      id_sensor_suhu: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_sensor_kelembapan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_sensor_ph: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      suhu: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      kelembapan: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      ph: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      id_lokasi: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "lokasis",
        },
      },
      indikasi: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tingkat_keparahan: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("data");
  },
};
