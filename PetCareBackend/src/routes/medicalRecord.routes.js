const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/medicalRecord.controller');
const { requireAuth, requireDoctor } = require('../middleware/auth');

router.get('/pet/:petId', requireAuth, ctrl.getByPet);
router.get('/appointment/:appointmentId', requireAuth, ctrl.getByAppointment);
router.get('/', requireAuth, ctrl.getAll);
router.post('/', requireDoctor, ctrl.save);
router.get('/:id', requireAuth, ctrl.getOne);
router.put('/:id', requireDoctor, ctrl.update);
router.post('/:id/prescriptions', requireDoctor, ctrl.addPrescription);
router.delete('/:id/prescriptions/:prescriptionId', requireDoctor, ctrl.removePrescription);

module.exports = router;
