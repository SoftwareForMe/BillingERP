const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Routes for invoice operations
router.post('/', invoiceController.generateInvoice);
router.get('/', invoiceController.getInvoices); // Added get all invoices route
router.get('/:id', invoiceController.getInvoiceById); // Added get invoice by ID route
router.put('/:id', invoiceController.updateInvoice); // Added update invoice route
router.delete('/:id', invoiceController.deleteInvoice); // Added delete invoice route
router.post('/:id/share', invoiceController.shareInvoice);

module.exports = router;
