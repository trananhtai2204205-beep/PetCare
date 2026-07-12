const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Doctor, Customer } = require('../models');
const jwtConfig = require('../config/jwt');

// Tạo access token
const generateToken = (payload) => jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
const generateRefreshToken = (payload) => jwt.sign(payload, jwtConfig.refreshSecret, { expiresIn: jwtConfig.refreshExpiresIn });

// ===== DOCTOR AUTH =====

exports.doctorLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
    }

    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    const payload = { id: doctor.id, role: 'doctor', email: doctor.email };
    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: doctor.id,
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone,
          specialty: doctor.specialty,
          avatar: doctor.avatar,
          licenseNumber: doctor.licenseNumber,
          role: 'doctor',
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.doctorForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const doctor = await Doctor.findOne({ where: { email } });
    // Không tiết lộ email có tồn tại hay không (bảo mật)
    res.json({ success: true, message: 'Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.' });
  } catch (err) {
    next(err);
  }
};

exports.doctorResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    // TODO: Implement token-based reset (OTP/email link)
    // Hiện tại: demo đơn giản
    res.json({ success: true, message: 'Đặt lại mật khẩu thành công' });
  } catch (err) {
    next(err);
  }
};

// ===== CUSTOMER AUTH =====

exports.customerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
    }

    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }

    const payload = { id: customer.id, role: 'customer', email: customer.email };
    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          avatar: customer.avatar,
          role: 'customer',
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.customerRegister = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
    }

    const existing = await Customer.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({ name, email, phone, password: hashedPassword });

    const payload = { id: customer.id, role: 'customer', email: customer.email };
    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          avatar: customer.avatar,
          role: 'customer',
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.customerForgotPassword = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.' });
  } catch (err) {
    next(err);
  }
};

exports.customerResetPassword = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Đặt lại mật khẩu thành công' });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Không có refresh token' });
    }

    const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
    const payload = { id: decoded.id, role: decoded.role, email: decoded.email };
    const accessToken = generateToken(payload);

    res.json({ success: true, data: { accessToken } });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Refresh token không hợp lệ hoặc đã hết hạn' });
  }
};
