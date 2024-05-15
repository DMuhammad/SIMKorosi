"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("lokasis", [
      {
        nama_lokasi: "Area A",
        geo_x: 106.827147,
        geo_y: -6.175393,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area B",
        geo_x: 107.590615,
        geo_y: -6.917464,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area C",
        geo_x: 110.364445,
        geo_y: -7.795586,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area D",
        geo_x: 112.743142,
        geo_y: -7.257473,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area E",
        geo_x: 106.827147,
        geo_y: -6.175393,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area F",
        geo_x: 107.590615,
        geo_y: -6.917464,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area G",
        geo_x: 110.364445,
        geo_y: -7.795586,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area H",
        geo_x: 112.743142,
        geo_y: -7.257473,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("lokasis", null, {});
  },
};
