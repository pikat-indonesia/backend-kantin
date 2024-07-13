const router = require("express").Router();
var db = require("../config/db_config");

exports.getMenu = (req, res) => {
  const idKantin = req.body.idKantin;
  let sql =
    "SELECT id, title, type, price, date FROM tbl_menu WHERE idKantin = '" +
    idKantin +
    "' AND status = 1 ORDER BY title ASC;";

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

exports.addMenu = (req, res) => {
  const { title, price, idKantin } = req.body;

  let sql =
    "INSERT INTO tbl_menu (title, price, date, idKantin, status) VALUES ('" +
    title +
    "', '" +
    price +
    "', NOW(), '" +
    idKantin +
    "', 1);";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
        error: err.message, // Optional: Mengirim pesan kesalahan ke klien
      });
    } else {
      res.status(200).json({
        message: "Menu added successfully",
        result: result,
      });
    }
  });
};

exports.editMenu = (req, res) => {
  const { id, title, price, idKantin } = req.body;

  let sql =
    "UPDATE tbl_menu SET title = '" +
    title +
    "', price = '" +
    price +
    "', date = NOW(), idKantin = '" +
    idKantin +
    "' WHERE id = '" +
    id +
    "' AND status = 1;";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
        error: err.message, // Optional: Mengirim pesan kesalahan ke klien
      });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "Menu updated successfully",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "No menu found to update",
          // result: result,
        });
      }
    }
  });
};

exports.deleteMenu = (req, res) => {
  const { id } = req.body;

  let sql =
    "UPDATE tbl_menu SET status = 0 WHERE id = '" + id + "' AND status = 1;";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
        error: err.message, // Optional: Mengirim pesan kesalahan ke klien
      });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "Menu deleted successfully",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "No menu found to delete",
          // result: result,
        });
      }
    }
  });
};
