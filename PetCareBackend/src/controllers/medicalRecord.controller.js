const { MedicalRecord, Prescription, Pet, Doctor, Appointment, Customer } = require('../models');

const recordIncludes = [
  { model: Pet, as: 'pet', include: [{ model: Customer, as: 'owner', attributes: { exclude: ['password'] } }] },
  { model: Doctor, as: 'doctor', attributes: { exclude: ['password'] } },
  { model: Appointment, as: 'appointment' },
  { model: Prescription, as: 'prescriptions' },
];

exports.getAll = async (req, res, next) => {
  try {
    const { q } = req.query;
    let where = {};

    // Customer chỉ xem hồ sơ của thú cưng thuộc mình
    let records;
    if (req.user.role === 'customer') {
      // Lấy các pet của customer
      const pets = await Pet.findAll({ where: { customer_id: req.user.id }, attributes: ['id'] });
      const petIds = pets.map(p => p.id);
      where.pet_id = petIds;
    }

    records = await MedicalRecord.findAll({
      where,
      include: recordIncludes,
      order: [['created_at', 'DESC']],
    });

    if (q) {
      const query = q.toLowerCase();
      records = records.filter(r =>
        r.pet?.name?.toLowerCase().includes(query) ||
        r.pet?.owner?.name?.toLowerCase().includes(query) ||
        r.diagnosis?.toLowerCase().includes(query) ||
        (r.symptoms || []).some(s => s.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, data: records, total: records.length });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id, { include: recordIncludes });
    if (!record) return res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ bệnh' });
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.getByPet = async (req, res, next) => {
  try {
    const records = await MedicalRecord.findAll({
      where: { pet_id: req.params.petId },
      include: recordIncludes,
      order: [['created_at', 'DESC']],
    });
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

exports.getByAppointment = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findOne({
      where: { appointment_id: req.params.appointmentId },
      include: recordIncludes,
    });
    res.json({ success: true, data: record || null });
  } catch (err) {
    next(err);
  }
};

exports.save = async (req, res, next) => {
  try {
    const {
      appointmentId, petId, symptoms, diagnosis,
      treatment, notes, weight, temperature, nextVisitDate,
      prescriptions = []
    } = req.body;

    const doctorId = req.user.id;

    // Upsert theo appointmentId
    let record = await MedicalRecord.findOne({ where: { appointment_id: appointmentId } });

    if (record) {
      await record.update({ symptoms, diagnosis, treatment, notes, weight, temperature, nextVisitDate });
      // Xóa prescriptions cũ, tạo lại
      await Prescription.destroy({ where: { medical_record_id: record.id } });
    } else {
      record = await MedicalRecord.create({
        appointmentId, petId, doctorId,
        symptoms, diagnosis, treatment, notes, weight, temperature, nextVisitDate
      });
    }

    if (prescriptions.length > 0) {
      const prescData = prescriptions.map(p => ({
        ...p,
        medicalRecordId: record.id,
        medical_record_id: record.id,
      }));
      await Prescription.bulkCreate(prescData);
    }

    const result = await MedicalRecord.findByPk(record.id, { include: recordIncludes });
    res.status(201).json({ success: true, message: 'Lưu hồ sơ bệnh thành công', data: result });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ' });

    const { symptoms, diagnosis, treatment, notes, weight, temperature, nextVisitDate } = req.body;
    await record.update({ symptoms, diagnosis, treatment, notes, weight, temperature, nextVisitDate });

    const result = await MedicalRecord.findByPk(record.id, { include: recordIncludes });
    res.json({ success: true, message: 'Cập nhật hồ sơ thành công', data: result });
  } catch (err) {
    next(err);
  }
};

exports.addPrescription = async (req, res, next) => {
  try {
    const { medicineName, dosage, frequency, duration, instructions } = req.body;
    const prescription = await Prescription.create({
      medicalRecordId: req.params.id,
      medical_record_id: req.params.id,
      medicineName, dosage, frequency, duration, instructions
    });
    res.status(201).json({ success: true, data: prescription });
  } catch (err) {
    next(err);
  }
};

exports.removePrescription = async (req, res, next) => {
  try {
    await Prescription.destroy({ where: { id: req.params.prescriptionId } });
    res.json({ success: true, message: 'Đã xóa đơn thuốc' });
  } catch (err) {
    next(err);
  }
};
