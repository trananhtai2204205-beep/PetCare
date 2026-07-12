const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { Doctor, Customer } = require('../models');

/**
 * Middleware xác thực JWT chung
 * Hỗ trợ cả Doctor và Customer token
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ success: false, message: 'Không có token xác thực' });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // { id, role: 'doctor' | 'customer', email }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token đã hết hạn' });
    }
    return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
  }
};

/**
 * Middleware chỉ cho phép Doctor
 */
const requireDoctor = async (req, res, next) => {
  await authenticate(req, res, async () => {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Chỉ bác sĩ mới có quyền truy cập' });
    }
    // Gắn đầy đủ thông tin doctor vào request
    const doctor = await Doctor.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bác sĩ' });
    }
    req.doctor = doctor;
    next();
  });
};

/**
 * Middleware chỉ cho phép Customer
 */
const requireCustomer = async (req, res, next) => {
  await authenticate(req, res, async () => {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ success: false, message: 'Chỉ khách hàng mới có quyền truy cập' });
    }
    const customer = await Customer.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khách hàng' });
    }
    req.customer = customer;
    next();
  });
};

/**
 * Middleware cho phép cả Doctor và Customer
 */
const requireAuth = async (req, res, next) => {
  await authenticate(req, res, next);
};

module.exports = { authenticate, requireDoctor, requireCustomer, requireAuth };
