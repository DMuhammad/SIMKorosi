"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Sensors", [
      {
        id: 1,
        tipe: "Sensor Suhu",
        lokasi: "Plant A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        tipe: "Sensor Kelembapan",
        lokasi: "Plant A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        tipe: "Sensor pH",
        lokasi: "Plant A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Sensors", null, {});
  },
};
