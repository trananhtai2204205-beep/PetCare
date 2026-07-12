const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prescription = sequelize.define('Prescription', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  medicalRecordId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'medical_record_id',
    references: { model: 'medical_records', key: 'id' },
  },
  medicineName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'medicine_name',
  },
  dosage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  frequency: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'prescriptions',
  timestamps: false,
});

module.exports = Prescription;
