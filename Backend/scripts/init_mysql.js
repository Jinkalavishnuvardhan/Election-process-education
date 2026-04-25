// scripts/init_mysql.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const sequelize = require('../config/mysql');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
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
