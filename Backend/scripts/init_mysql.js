// scripts/init_mysql.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const sequelize = require('../config/mysql');

(async () => {
  try {
    // Database initialized via MYSQL_URL in config
    const connection = null; // No longer manually connecting with individual DB_ variables
    console.log('Database created or already exists');
    await connection.end();

    await sequelize.authenticate();
    console.log('MySQL connection established');
    await sequelize.sync({ alter: true });
    console.log('Sequelize models synchronized');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing DB:', err);
    process.exit(1);
  }
})();
