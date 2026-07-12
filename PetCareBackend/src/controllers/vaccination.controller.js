const { VaccinationRecord, Vaccine, Pet, Doctor, Customer } = require('../models');
const { Op } = require('sequelize');

const vaccIncludes = [
  { model: Pet, as: 'pet', include: [{ model: Customer, as: 'owner', attributes: { exclude: ['password'] } }] },
  { model: Vaccine, as: 'vaccine' },
  { model: Doctor, as: 'doctor', attributes: { exclude: ['password'] } },
];

exports.getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;

    // Customer chỉ xem vaccination của thú cưng mình
    if (req.user.role === 'customer') {
      const pets = await Pet.findAll({ where: { customer_id: req.user.id }, attributes: ['id'] });
      where.pet_id = pets.map(p => p.id);
    }

    const records = await VaccinationRecord.findAll({
      where,
      include: vaccIncludes,
      order: [['next_due_date', 'ASC']],
    });
    res.json({ success: true, data: records, total: records.length });
  } catch (err) {
    next(err);
  }
};

exports.getUpcoming = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const limit = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

    const records = await VaccinationRecord.findAll({
      where: {
        status: 'scheduled',
        next_due_date: { [Op.between]: [today, limit] },
      },
      include: vaccIncludes,
      order: [['next_due_date', 'ASC']],
    });
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

exports.getByPet = async (req, res, next) => {
  try {
    const records = await VaccinationRecord.findAll({
      where: { pet_id: req.params.petId },
      include: vaccIncludes,
      order: [['administered_date', 'DESC']],
    });
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { petId, vaccineId, doseNumber, administeredDate, nextDueDate, status, batchNumber, notes } = req.body;
    const doctorId = req.user.role === 'doctor' ? req.user.id : req.body.doctorId;

    const record = await VaccinationRecord.create({
      petId, vaccineId, doctorId, doseNumber,
      administeredDate, nextDueDate,
      status: status || 'scheduled',
      batchNumber, notes
    });

    const result = await VaccinationRecord.findByPk(record.id, { include: vaccIncludes });
    res.status(201).json({ success: true, message: 'Thêm lịch vaccine thành công', data: result });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const record = await VaccinationRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi vaccine' });

    await record.update(req.body);
    const result = await VaccinationRecord.findByPk(record.id, { include: vaccIncludes });
    res.json({ success: true, message: 'Cập nhật thành công', data: result });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const record = await VaccinationRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi vaccine' });

    const { status, administeredDate } = req.body;
    await record.update({ status, administeredDate });
    res.json({ success: true, message: 'Cập nhật trạng thái vaccine thành công', data: record });
  } catch (err) {
    next(err);
  }
};
