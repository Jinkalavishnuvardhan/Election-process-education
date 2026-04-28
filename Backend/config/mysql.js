const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.DB_URL);

connection.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

module.exports = connection;

