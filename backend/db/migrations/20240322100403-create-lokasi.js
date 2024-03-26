"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lokasis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_lokasi: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      geo_x: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      geo_y: {
        allowNull: false,
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("lokasis");
  },
};
