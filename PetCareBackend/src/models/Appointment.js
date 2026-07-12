const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  petId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'pet_id',
    references: { model: 'pets', key: 'id' },
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'doctor_id',
    references: { model: 'doctors', key: 'id' },
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'customer_id',
    references: { model: 'customers', key: 'id' },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('checkup', 'vaccination', 'surgery', 'grooming', 'emergency', 'follow_up'),
    allowNull: false,
    defaultValue: 'checkup',
  },
  status: {
    type: DataTypes.ENUM('waiting', 'in_progress', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'waiting',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'appointments',
  timestamps: true,
});

module.exports = Appointment;
