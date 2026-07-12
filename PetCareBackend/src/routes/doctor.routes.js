const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/doctor.controller');
const { requireDoctor } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public
router.get('/', ctrl.getAllDoctors);

// Protected - Doctor only
router.get('/me', requireDoctor, ctrl.getMe);
router.put('/me', requireDoctor, ctrl.updateMe);
router.post('/me/change-password', requireDoctor, ctrl.changePassword);
router.post('/me/avatar', requireDoctor, upload.single('avatar'), ctrl.uploadAvatar);
router.get('/dashboard-stats', requireDoctor, ctrl.getDashboardStats);

module.exports = router;
