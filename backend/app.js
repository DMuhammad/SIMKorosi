const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(8000, () => console.log("Server is running on port: 8000"));
