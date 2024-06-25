const router = require("express").Router();
var db = require("../config/db_config");

exports.getTable = (req, res) => {
  // Menggunakan exports.getTable
  const idKantin = req.body.idKantin; // Mengambil idKantin dari parameter URL

  let sql = `SELECT * FROM tbl_table WHERE idKantin = '${idKantin}';`; // Query SQL untuk mengambil data dari tabel tbl_table berdasarkan idKantin

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
