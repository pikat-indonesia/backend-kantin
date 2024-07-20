const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
require("dotenv").config();

const db = require("../config/db_config");

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({
      message: "Data tidak lengkap",
    });
  }

  let sql =
    "SELECT tbl_user.*, tbl_kantin.nama FROM tbl_user LEFT JOIN tbl_kantin ON tbl_user.idKantin = tbl_kantin.id WHERE (tbl_user.role = 2 OR tbl_user.role = 3) AND tbl_user.username = ?";

  db.query(sql, [username], async function (err, result) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (result.length > 0) {
      const user = result[0];
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
            expiresIn: "2160h",
          });

          const userToken = crypto.AES.encrypt(
            JSON.stringify({
              user: user,
              token: token,
            }),
            process.env.JWT_KEY
          ).toString();

          return res.status(200).json({
            userToken: userToken,
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

// Example endpoint to hash password
exports.hashPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const hashedPassword = await getHashedPassword(password);
    res.status(200).json({ hashedPassword });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Error hashing password" });
  }
};

exports.dashboardLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(401).json({
      message: "Data tidak lengkap",
    });
  }

  let sql =
    "SELECT * FROM tbl_user WHERE (role = 1 OR role = 4) AND username = ?";

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
          const userToken = crypto.AES.encrypt(
            JSON.stringify({
              user: user,
              token: token,
            }),
            process.env.JWT_KEY
          ).toString();
          return res.status(200).json({
            userToken: userToken,
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
