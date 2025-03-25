const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// Routes for consultation operations
router.post('/', consultationController.addConsultation);
router.get('/', consultationController.getConsultations);
router.put('/:id', consultationController.updateConsultation); // Added update route
router.delete('/:id', consultationController.deleteConsultation); // Added delete route
router.get('/:id', consultationController.getConsultationById); // Added get by ID route

module.exports = router;
