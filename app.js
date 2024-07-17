const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

var db = require("./config/db_config");

const userRoutes = require("./routes/user");
const menuRoutes = require("./routes/menu");
const produkRoutes = require("./routes/produk");
const resiRoutes = require("./routes/resi");
const tableRoutes = require("./routes/table");

const app = express();

app.use(express.json(), cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/user", userRoutes);
app.use("/menu", menuRoutes);
app.use("/produk", produkRoutes);
app.use("/resi", resiRoutes);
app.use("/table", tableRoutes);

module.exports = app;
