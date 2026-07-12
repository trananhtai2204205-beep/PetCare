const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// Doctor Auth
router.post('/doctor/login', auth.doctorLogin);
router.post('/doctor/forgot-password', auth.doctorForgotPassword);
router.post('/doctor/reset-password', auth.doctorResetPassword);

// Customer Auth
router.post('/customer/login', auth.customerLogin);
router.post('/customer/register', auth.customerRegister);
router.post('/customer/forgot-password', auth.customerForgotPassword);
router.post('/customer/reset-password', auth.customerResetPassword);

// Token refresh
router.post('/refresh-token', auth.refreshToken);

module.exports = router;
