const bcrypt = require('bcryptjs');
const { Customer } = require('../models');

exports.getMe = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.customer });
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;
    await req.customer.update({ name, phone, address });
    res.json({ success: true, message: 'Cập nhật thông tin thành công', data: req.customer });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const customer = await Customer.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await customer.update({ password: hashed });

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
    await req.customer.update({ avatar: avatarUrl });
    res.json({ success: true, message: 'Upload avatar thành công', data: { avatar: avatarUrl } });
  } catch (err) {
    next(err);
  }
};
