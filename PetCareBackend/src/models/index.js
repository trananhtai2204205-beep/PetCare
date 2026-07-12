const sequelize = require('../config/database');
const Doctor = require('./Doctor');
const Customer = require('./Customer');
const Pet = require('./Pet');
const Appointment = require('./Appointment');
const MedicalRecord = require('./MedicalRecord');
const Prescription = require('./Prescription');
const Vaccine = require('./Vaccine');
const VaccinationRecord = require('./VaccinationRecord');

// ===== ASSOCIATIONS =====

// Customer <-> Pet (1:N)
Customer.hasMany(Pet, { foreignKey: 'customer_id', as: 'pets' });
Pet.belongsTo(Customer, { foreignKey: 'customer_id', as: 'owner' });

// Pet <-> Appointment (1:N)
Pet.hasMany(Appointment, { foreignKey: 'pet_id', as: 'appointments' });
Appointment.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });

// Doctor <-> Appointment (1:N)
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id', as: 'appointments' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

// Customer <-> Appointment (1:N)
Customer.hasMany(Appointment, { foreignKey: 'customer_id', as: 'appointments' });
Appointment.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

// Appointment <-> MedicalRecord (1:1)
Appointment.hasOne(MedicalRecord, { foreignKey: 'appointment_id', as: 'medicalRecord' });
MedicalRecord.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

// Pet <-> MedicalRecord (1:N)
Pet.hasMany(MedicalRecord, { foreignKey: 'pet_id', as: 'medicalRecords' });
MedicalRecord.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });

// Doctor <-> MedicalRecord (1:N)
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctor_id', as: 'medicalRecords' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

// MedicalRecord <-> Prescription (1:N)
MedicalRecord.hasMany(Prescription, { foreignKey: 'medical_record_id', as: 'prescriptions', onDelete: 'CASCADE' });
Prescription.belongsTo(MedicalRecord, { foreignKey: 'medical_record_id', as: 'medicalRecord' });

// Pet <-> VaccinationRecord (1:N)
Pet.hasMany(VaccinationRecord, { foreignKey: 'pet_id', as: 'vaccinationRecords' });
VaccinationRecord.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });

// Vaccine <-> VaccinationRecord (1:N)
Vaccine.hasMany(VaccinationRecord, { foreignKey: 'vaccine_id', as: 'records' });
VaccinationRecord.belongsTo(Vaccine, { foreignKey: 'vaccine_id', as: 'vaccine' });

// Doctor <-> VaccinationRecord (1:N)
Doctor.hasMany(VaccinationRecord, { foreignKey: 'doctor_id', as: 'vaccinationRecords' });
VaccinationRecord.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

module.exports = {
  sequelize,
  Doctor,
  Customer,
  Pet,
  Appointment,
  MedicalRecord,
  Prescription,
  Vaccine,
  VaccinationRecord,
};
