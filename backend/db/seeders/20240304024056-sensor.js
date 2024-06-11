"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sensors", [
      {
        id: "SS-S-01",
        jenis_sensor: "Sensor Suhu",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-K-01",
        jenis_sensor: "Sensor Kelembapan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-P-01",
        jenis_sensor: "Sensor pH",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-S-02",
        jenis_sensor: "Sensor Suhu",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-K-02",
        jenis_sensor: "Sensor Kelembapan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-P-02",
        jenis_sensor: "Sensor pH",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-S-03",
        jenis_sensor: "Sensor Suhu",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-K-03",
        jenis_sensor: "Sensor Kelembapan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-P-03",
        jenis_sensor: "Sensor pH",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-S-04",
        jenis_sensor: "Sensor Suhu",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-K-04",
        jenis_sensor: "Sensor Kelembapan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-P-04",
        jenis_sensor: "Sensor pH",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-S-05",
        jenis_sensor: "Sensor Suhu",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-K-05",
        jenis_sensor: "Sensor Kelembapan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "SS-P-05",
        jenis_sensor: "Sensor pH",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sensors", null, {});
  },
};
