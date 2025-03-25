const Consultation = require('../models/consultation');

// Function to add a new consultation
exports.addConsultation = (req, res) => {
        const consultationData = req.body; // Extract consultation data from request body
    // Validate the data (you can add more validation as needed)
    if (!consultationData.patientID || !consultationData.doctorID || !consultationData.consultationFee) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Use the Consultation model to save the new consultation
    Consultation.create(consultationData)
        .then(consultation => {
            res.status(201).json(consultation); // Send success response
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to add consultation' }); // Handle errors
        });
};

// Function to retrieve consultations for a patient
exports.getConsultations = (req, res) => {
        const patientID = req.params.patientID; // Extract patient ID from request parameters
    // Use the Consultation model to retrieve consultations for the patient
    Consultation.findAll({ where: { patientID } })
        .then(consultations => {
            res.status(200).json(consultations); // Send retrieved consultations
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to retrieve consultations' }); // Handle errors
        });
};
