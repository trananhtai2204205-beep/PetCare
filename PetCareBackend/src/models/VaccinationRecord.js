const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VaccinationRecord = sequelize.define('VaccinationRecord', {
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
  vaccineId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'vaccine_id',
    references: { model: 'vaccines', key: 'id' },
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'doctor_id',
    references: { model: 'doctors', key: 'id' },
  },
  doseNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'dose_number',
  },
  administeredDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'administered_date',
  },
  nextDueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'next_due_date',
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'overdue', 'cancelled'),
    defaultValue: 'scheduled',
  },
  batchNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'batch_number',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'vaccination_records',
  timestamps: true,
});

module.exports = VaccinationRecord;
