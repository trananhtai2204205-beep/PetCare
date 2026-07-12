const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vaccine.controller');
const { requireDoctor, requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, ctrl.getAll);
router.get('/:id', requireAuth, ctrl.getOne);
router.post('/', requireDoctor, ctrl.create);
router.put('/:id', requireDoctor, ctrl.update);
router.delete('/:id', requireDoctor, ctrl.remove);

module.exports = router;
