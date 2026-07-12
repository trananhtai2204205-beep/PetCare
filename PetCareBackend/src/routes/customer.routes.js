const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/customer.controller');
const { requireCustomer } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/me', requireCustomer, ctrl.getMe);
router.put('/me', requireCustomer, ctrl.updateMe);
router.post('/me/change-password', requireCustomer, ctrl.changePassword);
router.post('/me/avatar', requireCustomer, upload.single('avatar'), ctrl.uploadAvatar);

module.exports = router;
