const Invoice = require('../models/invoice');

// Function to generate an invoice
exports.generateInvoice = (req, res) => {
        const invoiceData = req.body; // Extract invoice data from request body
    // Validate the data (you can add more validation as needed)
    if (!invoiceData.patientID || !invoiceData.amount || !invoiceData.services) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Use the Invoice model to create a new invoice
    Invoice.create(invoiceData)
        .then(invoice => {
            res.status(201).json(invoice); // Send success response
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to generate invoice' }); // Handle errors
        });
};

// Function to share an invoice via WhatsApp
exports.shareInvoice = (req, res) => {
        const invoiceID = req.params.invoiceID; // Extract invoice ID from request parameters
    // Use the Invoice model to retrieve the invoice details
    Invoice.findByPk(invoiceID)
        .then(invoice => {
            if (!invoice) {
                return res.status(404).json({ error: 'Invoice not found' });
            }
            // Logic to share the invoice via WhatsApp (placeholder)
            // This could involve using a WhatsApp API to send the invoice details
            res.status(200).json({ message: 'Invoice shared successfully', invoice }); // Send success response
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to share invoice' }); // Handle errors
        });
};
