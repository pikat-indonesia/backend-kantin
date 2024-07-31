const router = require("express").Router();
var db = require("../config/db_config");

exports.getType = (req, res) => {
  const idKantin = req.body.idKantin;

  let sql = `SELECT * FROM tbl_menu_type WHERE idKantin = '${idKantin}' AND status = 1;`;
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

exports.addType = (req, res) => {
  const { name, idKantin, color } = req.body;

  let sql =
    "INSERT INTO tbl_menu_type (name, idKantin, color) VALUES ('" +
    name +
    "','" +
    idKantin +
    "', '" +
    color +
    "');";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
        error: err.message, // Optional: Mengirim pesan kesalahan ke klien
      });
    } else {
      res.status(200).json({
        message: "Menu Type added successfully",
        result: result,
      });
    }
  });
};

exports.editType = (req, res) => {
  const { id, name, idKantin, color } = req.body;

  let sql =
    "UPDATE tbl_menu_type SET name = '" +
    name +
    "', idKantin = '" +
    idKantin +
    "', color = '" +
    color +
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
          message: "Menu Type updated successfully",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "No Menu Type found to update",
          // result: result,
        });
      }
    }
  });
};

exports.deleteType = (req, res) => {
  const { id } = req.body;

  let sql =
    "UPDATE tbl_menu_type SET status = 0 WHERE id = '" +
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
          message: "Menu Type deleted successfully",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "No Menu Type found to delete",
          // result: result,
        });
      }
    }
  });
};
