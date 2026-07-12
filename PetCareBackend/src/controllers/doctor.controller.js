const bcrypt = require('bcryptjs');
const { Doctor, Appointment } = require('../models');
const { Op } = require('sequelize');

exports.getMe = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.doctor });
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { name, phone, specialty, licenseNumber } = req.body;
    await req.doctor.update({ name, phone, specialty, licenseNumber });
    res.json({ success: true, message: 'Cập nhật thông tin thành công', data: req.doctor });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const doctor = await Doctor.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await doctor.update({ password: hashed });

    res.json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (err) {
    next(err);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Vui lòng chọn ảnh' });
    }
    const avatarUrl = `/uploads/${req.file.filename}`;
    await req.doctor.update({ avatar: avatarUrl });
    res.json({ success: true, message: 'Upload avatar thành công', data: { avatar: avatarUrl } });
  } catch (err) {
    next(err);
  }
};

exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: ['id', 'name', 'specialty', 'phone', 'avatar', 'licenseNumber'],
    });
    res.json({ success: true, data: doctors });
  } catch (err) {
    next(err);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const doctorId = req.doctor.id;

    const todayAppts = await Appointment.findAll({
      where: { doctor_id: doctorId, date: today }
    });

    const totalToday = todayAppts.length;
    const completedToday = todayAppts.filter(a => a.status === 'completed').length;
    const waitingToday = todayAppts.filter(a => a.status === 'waiting').length;
    const inProgressToday = todayAppts.filter(a => a.status === 'in_progress').length;
    const completionRate = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

    res.json({
      success: true,
      data: {
        todayCases: totalToday,
        completedCases: completedToday,
        waitingCases: waitingToday,
        inProgressCases: inProgressToday,
        completionRate,
      }
    });
  } catch (err) {
    next(err);
  }
};
