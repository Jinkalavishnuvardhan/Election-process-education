const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Candidate = sequelize.define('Candidate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Reference to the User (voter) who is the candidate
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  // Reference to the Political Party
  partyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'parties', key: 'id' },
  },
  skills: { type: DataTypes.JSON, allowNull: false }, // store array as JSON
  objectives: { type: DataTypes.JSON, allowNull: false },
  bio: { type: DataTypes.TEXT, allowNull: false },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'candidates',
  timestamps: false,
});

module.exports = Candidate;