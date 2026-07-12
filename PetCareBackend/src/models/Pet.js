const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'customer_id',
    references: { model: 'customers', key: 'id' },
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  species: {
    type: DataTypes.ENUM('dog', 'cat', 'bird', 'rabbit', 'other'),
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  age: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'pets',
  timestamps: true,
});

module.exports = Pet;
