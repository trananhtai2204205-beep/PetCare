const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  specialty: {
    type: DataTypes.STRING(100),
    defaultValue: 'Thú y tổng quát',
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  licenseNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'license_number',
  },
}, {
  tableName: 'doctors',
  timestamps: true,
});

module.exports = Doctor;
