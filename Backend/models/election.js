const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Election = sequelize.define('Election', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  where: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  startTime: { type: DataTypes.STRING, allowNull: false },
  endTime: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  rules: { type: DataTypes.TEXT },
  isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'elections',
  timestamps: false,
});

module.exports = Election;
