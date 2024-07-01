"use strict";

const { v4: uuidv4 } = require("uuid");

async function generateData() {
  const data = [];
  const sensors = [
    "ad:da:a6:a5:1e:7a",
    "3d:99:5f:a0:f6:e7",
    "cd:70:07:69:22:22",
    "e7:4a:88:3b:ea:e1",
    "49:05:e6:90:0c:33",
    "91:59:a7:0a:f8:15",
    "86:50:82:79:ff:d1",
    "ce:2c:ed:8a:fc:20",
    "e8:08:a5:1d:26:e9",
    "2e:e4:98:8e:a8:e1",
    "ea:e3:f7:cd:74:5c",
    "6e:16:cc:43:70:c4",
    "7e:61:ad:ba:19:02",
    "11:b7:75:98:2b:85",
    "b5:fb:92:03:ec:58",
  ];
  for (let index = 0; index < 200; index++) {
    const id_sensor = sensors[Number(Math.floor(Math.random() * 14))];
    const suhu = Number((Math.random() * 40).toFixed(1)) + 30;
    const kelembapan = Number((Math.random() * 30).toFixed(1)) + 60;
    const ph = Number((Math.random() * 10).toFixed(1)) + 3;

    let indikasi, tingkat_keparahan;

    if (kelembapan < 80 && suhu < 50 && ph < 7) {
      indikasi = "Rendah";
      tingkat_keparahan = "Rendah";
    } else if (kelembapan < 80 && suhu > 50 && ph > 7) {
      indikasi = "Rendah";
      tingkat_keparahan = "Rendah";
    } else if (kelembapan < 80 && suhu > 50 && ph < 7) {
      indikasi = "Sedang";
      tingkat_keparahan = "Sedang";
    } else if (kelembapan > 80 && suhu < 50 && ph > 7) {
      indikasi = "Rendah";
      tingkat_keparahan = "Rendah";
    } else if (kelembapan > 80 && suhu < 50 && ph < 7) {
      indikasi = "Sedang";
      tingkat_keparahan = "Sedang";
    } else if (kelembapan > 80 && suhu > 50 && ph > 7) {
      indikasi = "Sedang";
      tingkat_keparahan = "Sedang";
    } else if (kelembapan > 80 && suhu > 50 && ph < 7) {
      indikasi = "Tinggi";
      tingkat_keparahan = "Tinggi";
    }

    data.push({
      id: uuidv4(),
      id_sensor,
      suhu,
      kelembapan,
      ph,
      indikasi,
      tingkat_keparahan,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return data;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = await generateData();
    return queryInterface.bulkInsert("data", data);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("data", null, {});
  },
};
