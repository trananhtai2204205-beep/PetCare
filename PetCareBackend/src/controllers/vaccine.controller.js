const { Vaccine } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const vaccines = await Vaccine.findAll({ order: [['name', 'ASC']] });
    res.json({ success: true, data: vaccines });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findByPk(req.params.id);
    if (!vaccine) return res.status(404).json({ success: false, message: 'Không tìm thấy vaccine' });
    res.json({ success: true, data: vaccine });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, manufacturer, dosage, intervalDays, requiredDoses } = req.body;
    const vaccine = await Vaccine.create({ name, description, manufacturer, dosage, intervalDays, requiredDoses });
    res.status(201).json({ success: true, data: vaccine });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findByPk(req.params.id);
    if (!vaccine) return res.status(404).json({ success: false, message: 'Không tìm thấy vaccine' });
    await vaccine.update(req.body);
    res.json({ success: true, data: vaccine });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findByPk(req.params.id);
    if (!vaccine) return res.status(404).json({ success: false, message: 'Không tìm thấy vaccine' });
    await vaccine.destroy();
    res.json({ success: true, message: 'Đã xóa vaccine' });
  } catch (err) {
    next(err);
  }
};
