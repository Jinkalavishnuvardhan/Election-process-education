const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_URL);

sequelize.authenticate()
  .then(() => console.log("MySQL Connected ✅"))
  .catch(err => console.error("MySQL Error ❌", err));

module.exports = sequelize;
