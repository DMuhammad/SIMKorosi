"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sensors", [
      {
        id: "ad:da:a6:a5:1e:7a",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3d:99:5f:a0:f6:e7",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "cd:70:07:69:22:22",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "e7:4a:88:3b:ea:e1",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "49:05:e6:90:0c:33",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "91:59:a7:0a:f8:15",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "86:50:82:79:ff:d1",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "ce:2c:ed:8a:fc:20",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "e8:08:a5:1d:26:e9",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2e:e4:98:8e:a8:e1",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "ea:e3:f7:cd:74:5c",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6e:16:cc:43:70:c4",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "7e:61:ad:ba:19:02",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "11:b7:75:98:2b:85",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b5:fb:92:03:ec:58",
        id_lokasi: Number(Math.round(Math.random() * 8)),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("sensors", null, {});
  },
};
