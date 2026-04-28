const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_URL);

sequelize.authenticate()
  .then(() => console.log("MySQL Connected ✅"))
  .catch(err => console.log("MySQL Error ❌", err.message));

module.exports = sequelize;
