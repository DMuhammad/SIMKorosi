const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: "localhost",
  }
);

sequelize
  .authenticate()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port: 3000");
    });
  })
  .catch(() => {
    console.log("error");
  });
