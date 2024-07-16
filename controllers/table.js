const router = require("express").Router();
var db = require("../config/db_config");

exports.getTable = (req, res) => {
  const idKantin = req.body.idKantin;

  let sql = `SELECT * FROM tbl_table WHERE idKantin = '${idKantin}' AND status = 1;`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
      });
    }

    if (result.length > 0) {
      res.status(200).json({
        message: "Success",
        data: result, // Mengirimkan data hasil query sebagai respons
      });
    } else {
      res.status(204).json({
        message: "No Data",
      });
    }
  });
};

exports.addTable = (req, res) => {
  const { title, cost, idKantin } = req.body;

  let sql =
    "INSERT INTO tbl_table (title, cost, idKantin, status) VALUES ('" +
    title +
    "','" +
    cost +
    "',  '" +
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
        message: "Table added successfully",
        result: result,
      });
    }
  });
};

exports.editTable = (req, res) => {
  const { id, title, cost, idKantin } = req.body;

  let sql =
    "UPDATE tbl_table SET title = '" +
    title +
    "', cost = '" +
    cost +
    "', idKantin = '" +
    idKantin +
    "' WHERE id = '" +
    id +
    "' AND status = 1;";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
        error: err.message,
      });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "Table updated successfully",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "No Table found to update",
          // result: result,
        });
      }
    }
  });
};

exports.deleteTable = (req, res) => {
  const { id } = req.body;

  let sql =
    "UPDATE tbl_table SET status = 0 WHERE id = '" + id + "' AND status = 1;";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
        error: err.message, // Optional: Mengirim pesan kesalahan ke klien
      });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "Table deleted successfully",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "No Table found to delete",
          // result: result,
        });
      }
    }
  });
};
