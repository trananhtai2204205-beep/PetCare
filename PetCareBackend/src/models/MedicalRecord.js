const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalRecord = sequelize.define('MedicalRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  appointmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'appointment_id',
    references: { model: 'appointments', key: 'id' },
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
  symptoms: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  treatment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  nextVisitDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'next_visit_date',
  },
}, {
  tableName: 'medical_records',
  timestamps: true,
});

module.exports = MedicalRecord;
