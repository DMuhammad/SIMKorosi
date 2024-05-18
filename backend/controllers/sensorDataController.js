const db = require("../db/models");
const { v4: uuidv4 } = require("uuid");
const excelJS = require("exceljs");
const socket = require("../utils/socket");
const { getDateRange } = require("../utils/dateUtils");

const Data = db.sequelize.models.Data;

module.exports = {
  async getData(req, res) {
    const limit = 10;
    const { page } = req.query;
    try {
      const { count, rows: data } = await Data.findAndCountAll({
        order: [["created_at", "DESC"]],
        limit: 10,
        offset: (page - 1) * limit,
        include: ["lokasi"],
      });

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Berhasil mengambil data sensor",
        data,
        pagination: {
          page: parseInt(page),
          limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },

  async getDataCharts(req, res) {
    const { period, location } = req.query;

    try {
      const date = new Date().toISOString();
      const { startDate, endDate } = getDateRange(date, period);
      const data = await Data.findAll({
        include: [
          {
            model: db.sequelize.models.Lokasi,
            as: "lokasi",
            where: {
              nama_lokasi: location,
            },
            required: true,
          },
        ],
        where: {
          created_at: {
            [db.Sequelize.Op.gte]: startDate,
            [db.Sequelize.Op.lte]: endDate,
          },
        },
      });

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Berhasil mengambil data chart sensor",
        data,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },

  async addNewData(req, res) {
    const {
      id_sensor_suhu,
      id_sensor_kelembapan,
      id_sensor_ph,
      suhu,
      kelembapan,
      ph,
      id_lokasi,
    } = req.body;
    const io = socket.getIO();

    let indikasi, tingkat_keparahan;

    if (suhu > 30 && kelembapan > 80 && ph < 7) {
      indikasi = "Tinggi";
      tingkat_keparahan = "Tinggi";
    } else if (
      (suhu > 30 && kelembapan > 80) ||
      (suhu > 30 && ph < 7) ||
      (kelembapan > 80 && ph < 7)
    ) {
      indikasi = "Sedang";
      tingkat_keparahan = "Sedang";
    } else if (suhu > 30 || kelembapan > 80 || ph < 7) {
      indikasi = "Rendah";
      tingkat_keparahan = "Rendah";
    }

    try {
      const data = await Data.create({
        id: uuidv4(),
        id_sensor_suhu,
        id_sensor_kelembapan,
        id_sensor_ph,
        suhu,
        kelembapan,
        ph,
        id_lokasi,
        indikasi,
        tingkat_keparahan,
      });

      io.emit("data-baru", data);

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Berhasil menambahkan data sensor",
        data: {
          id: data.id,
          suhu,
          kelembapan,
          ph,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },

  async exportData(req, res) {
    const { tanggal_mulai, tanggal_selesai, nama } = req.query;

    try {
      const data = await Data.findAll({
        where: {
          created_at: {
            [db.Sequelize.Op.gte]: tanggal_mulai,
            [db.Sequelize.Op.lte]: tanggal_selesai,
          },
        },
        include: ["lokasi"],
      });

      const prepareDataForExcel = (data) => {
        return data.map((item) => ({
          suhu: item.suhu,
          kelembapan: item.kelembapan,
          ph: item.ph,
          indikasi: item.indikasi,
          tingkat_keparahan: item.tingkat_keparahan,
          createdAt: item.createdAt,
          nama_lokasi: item.lokasi.nama_lokasi,
        }));
      };

      const preparedData = prepareDataForExcel(data);

      const workbook = new excelJS.Workbook();
      const worksheet = workbook.addWorksheet("Data Sensor", {
        pageSetup: {
          paperSize: 9,
          orientation: "portrait",
        },
      });

      workbook.creator = nama;

      worksheet.columns = [
        {
          header: "Suhu",
          key: "suhu",
          width: 15,
        },
        { header: "Kelembapan", key: "kelembapan", width: 15 },
        { header: "PH", key: "ph", width: 10 },
        {
          header: "Lokasi",
          key: "nama_lokasi",
          width: 15,
          style: {
            alignment: {
              horizontal: "right",
            },
          },
        },
        { header: "Indikasi Korosi", key: "indikasi", width: 15 },
        {
          header: "Tingkat Keparahan Korosi",
          key: "tingkat_keparahan",
          width: 25,
        },
        {
          header: "Tanggal",
          key: "createdAt",
          width: 25,
          style: {
            numFmt: "dd/mm/yyyy hh:mm:ss",
          },
        },
      ];

      preparedData.forEach((data) => {
        worksheet.addRow(data);
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      workbook.xlsx.write(res).then(() => {
        res.status(200).end();
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },
};
