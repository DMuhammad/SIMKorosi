"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SensorData", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      lokasi: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SensorData");
  },
};
