const { Pet, Customer } = require('../models');

// Doctor: xem tất cả; Customer: chỉ xem thú cưng của mình
exports.getAll = async (req, res, next) => {
  try {
    let pets;
    if (req.user.role === 'doctor') {
      pets = await Pet.findAll({
        include: [{ model: Customer, as: 'owner', attributes: { exclude: ['password'] } }],
        order: [['created_at', 'DESC']],
      });
    } else {
      pets = await Pet.findAll({
        where: { customer_id: req.user.id },
        order: [['created_at', 'DESC']],
      });
    }
    res.json({ success: true, data: pets });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const pet = await Pet.findByPk(req.params.id, {
      include: [{ model: Customer, as: 'owner', attributes: { exclude: ['password'] } }]
    });
    if (!pet) return res.status(404).json({ success: false, message: 'Không tìm thấy thú cưng' });

    // Customer chỉ xem thú cưng của mình
    if (req.user.role === 'customer' && pet.customerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Không có quyền truy cập' });
    }

    res.json({ success: true, data: pet });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, species, breed, age, weight, gender, color } = req.body;
    const customerId = req.user.role === 'customer' ? req.user.id : req.body.customerId;

    if (!customerId) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin khách hàng' });
    }

    const pet = await Pet.create({ customerId, name, species, breed, age, weight, gender, color });
    res.status(201).json({ success: true, message: 'Thêm thú cưng thành công', data: pet });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ success: false, message: 'Không tìm thấy thú cưng' });

    if (req.user.role === 'customer' && pet.customerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Không có quyền chỉnh sửa' });
    }

    const { name, species, breed, age, weight, gender, color } = req.body;
    await pet.update({ name, species, breed, age, weight, gender, color });
    res.json({ success: true, message: 'Cập nhật thú cưng thành công', data: pet });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ success: false, message: 'Không tìm thấy thú cưng' });

    if (req.user.role === 'customer' && pet.customerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Không có quyền xóa' });
    }

    await pet.destroy();
    res.json({ success: true, message: 'Đã xóa thú cưng' });
  } catch (err) {
    next(err);
  }
};
