const Payment = require('../models/payment');

// Function to process payment
exports.processPayment = (req, res) => {
        const paymentData = req.body; // Extract payment data from request body
    // Validate the data (you can add more validation as needed)
    if (!paymentData.amount || !paymentData.patientID || !paymentData.method) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Use the Payment model to create a new payment
    Payment.create(paymentData)
        .then(payment => {
            res.status(201).json(payment); // Send success response
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to process payment' }); // Handle errors
        });
};

// Function to retrieve payment history for a patient
exports.getPaymentHistory = (req, res) => {
        const patientID = req.params.patientID; // Extract patient ID from request parameters
    // Use the Payment model to retrieve the payment history for the patient
    Payment.findAll({ where: { patientID } })
        .then(paymentHistory => {
            res.status(200).json(paymentHistory); // Send retrieved payment history
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to retrieve payment history' }); // Handle errors
        });
};
