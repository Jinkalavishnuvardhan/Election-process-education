const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected ✅");
  } catch (err) {
    console.error("MySQL Error ❌", err.message);
    // ❗ DO NOT EXIT APP
  }
}

connectDB();

module.exports = sequelize;
