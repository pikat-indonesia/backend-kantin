var mysql = require("mysql2");

var db = mysql.createPool({
  host: "mysql-154285-0.cloudclusters.net",
  user: "pikat_pos",
  password: "pikat_kam24",
  database: "db_pos_pikat",
  port: 10067,
  waitForConnections: true,
  connectionLimit: 200,
  queueLimit: 0,
  debug: false,
});

db.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = db;
