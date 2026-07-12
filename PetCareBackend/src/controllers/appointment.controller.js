const { Appointment, Pet, Doctor, Customer } = require('../models');
const { Op } = require('sequelize');

const apptIncludes = [
  { model: Pet, as: 'pet', include: [{ model: Customer, as: 'owner', attributes: { exclude: ['password'] } }] },
  { model: Doctor, as: 'doctor', attributes: { exclude: ['password'] } },
  { model: Customer, as: 'customer', attributes: { exclude: ['password'] } },
];

exports.getAll = async (req, res, next) => {
  try {
    const { status, date, petName, q } = req.query;
    const where = {};

    if (req.user.role === 'customer') {
      where.customer_id = req.user.id;
    } else {
      // Doctor: lọc theo doctorId của mình
      where.doctor_id = req.user.id;
    }

    if (status) where.status = status;
    if (date) where.date = date;

    let appointments = await Appointment.findAll({
      where,
      include: apptIncludes,
      order: [['date', 'DESC'], ['time', 'ASC']],
    });

    // Tìm kiếm theo tên thú cưng hoặc chủ
    if (q) {
      const query = q.toLowerCase();
      appointments = appointments.filter(a =>
        a.pet?.name?.toLowerCase().includes(query) ||
        a.pet?.owner?.name?.toLowerCase().includes(query) ||
        a.pet?.breed?.toLowerCase().includes(query)
      );
    }

    res.json({ success: true, data: appointments, total: appointments.length });
  } catch (err) {
    next(err);
  }
};

exports.getToday = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const appointments = await Appointment.findAll({
      where: { doctor_id: req.user.id, date: today },
      include: apptIncludes,
      order: [['time', 'ASC']],
    });
    res.json({ success: true, data: appointments });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const appt = await Appointment.findByPk(req.params.id, { include: apptIncludes });
    if (!appt) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn' });

    if (req.user.role === 'customer' && appt.customerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Không có quyền truy cập' });
    }

    res.json({ success: true, data: appt });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { petId, doctorId, date, time, type, notes, customerId: bodyCustomerId } = req.body;
    const customerId = req.user.role === 'customer' ? req.user.id : bodyCustomerId;

    if (!petId || !doctorId || !date || !time) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc' });
    }

    const appt = await Appointment.create({
      petId, doctorId, customerId, date, time,
      type: type || 'checkup',
      status: 'waiting',
      notes,
    });

    const result = await Appointment.findByPk(appt.id, { include: apptIncludes });
    res.status(201).json({ success: true, message: 'Tạo lịch hẹn thành công', data: result });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn' });

    if (req.user.role === 'customer' && appt.customerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Không có quyền chỉnh sửa' });
    }

    const { date, time, type, notes, status } = req.body;
    await appt.update({ date, time, type, notes, status });
    const result = await Appointment.findByPk(appt.id, { include: apptIncludes });
    res.json({ success: true, message: 'Cập nhật lịch hẹn thành công', data: result });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn' });

    const { status } = req.body;
    const validStatuses = ['waiting', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' });
    }

    await appt.update({ status });
    res.json({ success: true, message: 'Cập nhật trạng thái thành công', data: appt });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn' });

    if (req.user.role === 'customer' && appt.customerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Không có quyền xóa' });
    }

    await appt.update({ status: 'cancelled' });
    res.json({ success: true, message: 'Đã hủy lịch hẹn' });
  } catch (err) {
    next(err);
  }
};
