const router = require("express").Router();
var db = require("../config/db_config");

exports.getResi = (req, res) => {
  const idKantin = req.body.idKantin;
  let sql =
    "SELECT tbl_resi.id AS resi_id, tbl_resi.table_type, tbl_resi.cost AS resi_cost, tbl_resi.pay, tbl_resi.change, tbl_resi.date AS resi_date, JSON_ARRAYAGG(JSON_OBJECT('name', tbl_penjualan.name,'qty', tbl_penjualan.qty,'cost', tbl_penjualan.cost) ) AS items FROM tbl_resi LEFT JOIN tbl_penjualan ON tbl_resi.id = tbl_penjualan.idresi WHERE tbl_resi.idKantin = '" +
    idKantin +
    "' AND DATE(tbl_resi.date) = CURDATE() GROUP BY tbl_resi.id,tbl_resi.table_type,tbl_resi.cost,tbl_resi.pay,tbl_resi.change,tbl_resi.date;";

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

exports.addResi = (req, res) => {
  const { idKantin, table_type, resi_cost, pay, change, items } = req.body;

  // Insert new resi into tbl_resi
  let sqlResi =
    "INSERT INTO tbl_resi (table_type, cost, pay, `change`, idKantin) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sqlResi,
    [table_type, resi_cost, pay, change, idKantin],
    function (err, result) {
      if (err) {
        return res.status(401).json({
          message: "Error inserting resi",
        });
      }

      const resiId = result.insertId;

      // Insert items into tbl_penjualan
      let sqlPenjualan =
        "INSERT INTO tbl_penjualan (name, qty, cost, idKantin, idresi) VALUES ?";
      const values = items.map((item) => [
        item.name,
        item.qty,
        item.cost,
        idKantin,
        resiId,
      ]);

      db.query(sqlPenjualan, [values], function (err) {
        if (err) {
          return res.status(401).json({
            message: "Error inserting items",
          });
        }

        res.status(200).json({
          message: "Success",
          resi_id: resiId,
        });
      });
    }
  );
};
