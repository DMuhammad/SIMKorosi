"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sensors", {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
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
    await queryInterface.dropTable("sensors");
  },
};
