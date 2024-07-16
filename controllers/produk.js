const router = require("express").Router();
var db = require("../config/db_config");

exports.getProduk = (req, res) => {
  const idKantin = req.body.idKantin;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  let sql =
    "SELECT id, name, qty, cost, date FROM tbl_penjualan WHERE idKantin = '" +
    idKantin +
    "' AND (DATE(tbl_penjualan.date) BETWEEN DATE('" +
    startDate +
    "') AND DATE('" +
    endDate +
    "'))";

  db.query(sql, function (err, result) {
    //if (err) throw err;
    if (err) {
      res.status(401).json({
        message: "Error",
      });
    }

    if (result.length > 0) {
      res.status(200).json({
        message: "Success",
        val: result,
      });
    } else {
      res.status(200).json({
        message: "No Data",
        // val: result,
      });
    }
  });
};
