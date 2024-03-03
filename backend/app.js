const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
