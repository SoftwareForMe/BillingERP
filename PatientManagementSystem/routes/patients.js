const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Routes for patient operations
router.post('/', patientController.registerPatient);
router.get('/', patientController.getPatients);
router.put('/:id', patientController.updatePatient); // Added update patient route
router.delete('/:id', patientController.deletePatient); // Added delete patient route
router.get('/:id', patientController.getPatientById); // Added get patient by ID route

module.exports = router;
