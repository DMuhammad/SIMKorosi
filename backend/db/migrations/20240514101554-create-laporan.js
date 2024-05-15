"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Laporans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_pengguna: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users",
        },
      },
      tanggal_mulai: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tanggal_selesai: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Laporans");
  },
};
