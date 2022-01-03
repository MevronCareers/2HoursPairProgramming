require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./src/config/db");
const routes = require("./src/routes/index");
const morgan = require("morgan");
const http = require("http");
db();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => console.log(`App is listening on port ${port}`));

module.exports = server;
