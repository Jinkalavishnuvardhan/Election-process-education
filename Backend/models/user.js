const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  nic: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  addressline1: { type: DataTypes.STRING, defaultValue: '' },
  addressline2: { type: DataTypes.STRING, defaultValue: '' },
  city: { type: DataTypes.STRING, allowNull: false },
  district: { type: DataTypes.STRING, allowNull: false },
  province: { type: DataTypes.STRING, allowNull: false },
  profilePhoto: { type: DataTypes.STRING, allowNull: false },
  nicFront: { type: DataTypes.STRING, allowNull: false },
  nicBack: { type: DataTypes.STRING, allowNull: false },
  realtimePhoto: { type: DataTypes.STRING, allowNull: false },
  photoUpdatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  isCandidate: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;