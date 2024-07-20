const router = require("express").Router();
var db = require("../config/db_config");

exports.getTableType = (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const idKantin = req.body.idKantin;

  let sql =
    "SELECT tbl_resi.id AS resi_id, tbl_resi.table_type, tbl_resi.cost AS resi_cost, tbl_resi.date AS resi_date FROM tbl_resi WHERE tbl_resi.idKantin = '" +
    idKantin +
    "' AND (DATE(tbl_resi.date) BETWEEN DATE('" +
    startDate +
    "') AND DATE('" +
    endDate +
    "')) GROUP BY tbl_resi.id, tbl_resi.table_type, tbl_resi.cost, tbl_resi.date;";

  db.query(sql, function (err, result) {
    if (err) {
      console.error("Error executing SQL:", err);
      res.status(500).json({
        message: "Error",
      });
      return;
    }

    if (result.length > 0) {
      res.status(200).json({
        message: "Success",
        val: result,
      });
    } else {
      res.status(200).json({
        message: "No Data",
      });
    }
  });
};
