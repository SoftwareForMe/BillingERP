const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes for payment operations
router.post('/', paymentController.processPayment);
router.get('/history', paymentController.getPaymentHistory);
router.get('/:id', paymentController.getPaymentById); // Added get payment by ID route
router.put('/:id', paymentController.updatePayment); // Added update payment route
router.delete('/:id', paymentController.deletePayment); // Added delete payment route

module.exports = router;
