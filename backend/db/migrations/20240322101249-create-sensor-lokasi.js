"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sensor_lokasis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_sensor: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          key: "id",
          model: "sensors",
        },
      },
      id_lokasi: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "lokasis",
        },
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
    await queryInterface.dropTable("sensor_lokasis");
  },
};
