const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vaccination.controller');
const { requireAuth, requireDoctor } = require('../middleware/auth');

router.get('/upcoming', requireDoctor, ctrl.getUpcoming);
router.get('/pet/:petId', requireAuth, ctrl.getByPet);
router.get('/', requireAuth, ctrl.getAll);
router.post('/', requireAuth, ctrl.create);
router.put('/:id', requireAuth, ctrl.update);
router.patch('/:id/status', requireDoctor, ctrl.updateStatus);

module.exports = router;
