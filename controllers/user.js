const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var db = require("../config/db_config");

exports.userLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(401).json({
      message: "Data tidak lengkap",
    });
  }

  let sql =
    "SELECT * FROM tbl_user WHERE (role = 2 OR role = 3) AND username = ?";

  db.query(sql, [username], async function (err, result) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (result.length > 0) {
      const user = result[0];
      console.log(bcrypt.hash(password, 5));
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
            expiresIn: "2160h",
          });

          return res.status(200).json({
            user: user,
            token: token,
            message: "Success",
          });
        } else {
          return res.status(401).json({
            message: "Password Wrong",
          });
        }
      } catch (compareError) {
        console.error("Password comparison error:", compareError);
        return res.status(500).json({
          message: "Password comparison error",
        });
      }
    } else {
      return res.status(401).json({
        message: "Incorrect Username or Password",
      });
    }
  });
};
