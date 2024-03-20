const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("http");
const router = require("./routes");
const socket = require("./utils/socket");
require("dotenv").config();

const app = express();
const server = createServer(app);
const io = socket.init(server);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", router);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(8000, () => console.log("Server is running on port: 8000"));
