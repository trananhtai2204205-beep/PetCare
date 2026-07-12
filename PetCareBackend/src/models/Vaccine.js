const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vaccine = sequelize.define('Vaccine', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  manufacturer: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  dosage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  intervalDays: {
    type: DataTypes.INTEGER,
    defaultValue: 365,
    field: 'interval_days',
  },
  requiredDoses: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
    field: 'required_doses',
  },
}, {
  tableName: 'vaccines',
  timestamps: true,
});

module.exports = Vaccine;
