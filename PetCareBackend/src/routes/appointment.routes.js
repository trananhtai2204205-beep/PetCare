const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/appointment.controller');
const { requireAuth, requireDoctor } = require('../middleware/auth');

router.get('/today', requireDoctor, ctrl.getToday);
router.get('/', requireAuth, ctrl.getAll);
router.post('/', requireAuth, ctrl.create);
router.get('/:id', requireAuth, ctrl.getOne);
router.put('/:id', requireAuth, ctrl.update);
router.patch('/:id/status', requireAuth, ctrl.updateStatus);
router.delete('/:id', requireAuth, ctrl.remove);

module.exports = router;
