const router = require("express").Router();
var db = require("../config/db_config");
const bcrypt = require("bcrypt");

const getHashedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error generating hashed password:", error);
    throw new Error("Error generating hashed password");
  }
};

exports.getUser = (req, res) => {
  const idKantin = req.body.idKantin;
  let sql =
    "SELECT * FROM tbl_user WHERE idKantin = '" +
    idKantin +
    "'AND status = 1 AND role = 2;";

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
exports.addUser = (req, res) => {
  const { username, password, idKantin } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  getHashedPassword(password)
    .then((hashedPassword) => {
      let sql =
        "INSERT INTO tbl_user (role, username, password, idKantin, status) VALUES (2,'" +
        username +
        "', '" +
        hashedPassword +
        "',  '" +
        idKantin +
        "', 1);";

      db.query(sql, function (err, result) {
        if (err) {
          res.status(401).json({
            message: "Error",
            error: err.message,
          });
        } else {
          res.status(200).json({
            message: "User added successfully",
            result: result,
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error hashing password:", error);
      res.status(500).json({ message: "Error hashing password" });
    });
};

// exports.editUser = (req, res) => {
//   const { id, role, username, password, idKantin } = req.body;

//   if (!password) {
//     return res.status(400).json({ message: "Password is required" });
//   }

//   getHashedPassword(password)
//     .then(hashedPassword => {
//       const sql =
//         "UPDATE tbl_user SET role = ?, username = ?, password = ?, idKantin = ? WHERE id = ? AND status = 1";
//       const values = [role, username, hashedPassword, idKantin, id];

//       db.query(sql, values, (err, result) => {
//         if (err) {
//           return res.status(401).json({
//             message: "Error",
//             error: err.message,
//           });
//         }

//         if (result.affectedRows > 0) {
//           res.status(200).json({
//             message: "User updated successfully",
//             result: result,
//           });
//         } else {
//           res.status(200).json({
//             message: "No user found to update",
//           });
//         }
//       });
//     })
//     .catch(error => {
//       console.error("Error hashing password:", error);
//       res.status(500).json({
//         message: "Error hashing password",
//         error: error.message,
//       });
//     });
// };

exports.deleteUser = (req, res) => {
  const { id } = req.body;

  let sql =
    "UPDATE tbl_user SET status = 0 WHERE id = '" + id + "' AND status = 1;";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(401).json({
        message: "Error",
        error: err.message, // Optional: Mengirim pesan kesalahan ke klien
      });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "User deleted successfully",
          result: result,
        });
      } else {
        res.status(200).json({
          message: "No user found to delete",
          // result: result,
        });
      }
    }
  });
};
