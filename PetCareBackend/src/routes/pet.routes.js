const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pet.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, ctrl.getAll);
router.post('/', requireAuth, ctrl.create);
router.get('/:id', requireAuth, ctrl.getOne);
router.put('/:id', requireAuth, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

module.exports = router;
