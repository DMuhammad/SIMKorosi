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
      {
        nama_lokasi: "Area I",
        geo_x: 105.265138,
        geo_y: -5.401244,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area J",
        geo_x: 109.012357,
        geo_y: -6.921389,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area K",
        geo_x: 113.334861,
        geo_y: -8.268556,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area L",
        geo_x: 114.597071,
        geo_y: -7.684534,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area M",
        geo_x: 104.776112,
        geo_y: -5.82,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area N",
        geo_x: 108.616016,
        geo_y: -6.107727,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area O",
        geo_x: 112.738126,
        geo_y: -8.002741,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama_lokasi: "Area P",
        geo_x: 115.175829,
        geo_y: -7.65383,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("lokasis", null, {});
  },
};
