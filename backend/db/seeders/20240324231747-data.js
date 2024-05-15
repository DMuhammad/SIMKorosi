"use strict";

const { v4: uuidv4 } = require("uuid");

async function generateData() {
  const datas = [];
  for (let index = 0; index < 200; index++) {
    const suhu = Number((Math.random() * 40).toFixed(1)) + 35;
    const kelembapan = Number((Math.random() * 30).toFixed(1)) + 60;
    const ph = Number((Math.random() * 10).toFixed(1)) + 3;
    const id_lokasi = Number(Math.round(Math.random() * 7)) + 1;

    datas.push({
      id: uuidv4(),
      id_sensor_suhu: "SS-S-01",
      id_sensor_kelembapan: "SS-K-01",
      id_sensor_ph: "SS-P-01",
      suhu,
      kelembapan,
      ph,
      id_lokasi,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return datas;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const datas = await generateData();
    return queryInterface.bulkInsert("data", datas);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("data", null, {});
  },
};
