const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Party = sequelize.define('Party', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  partyId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  logoUrl: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'parties',
  timestamps: false,
});

module.exports = Party;
