const Patient = require('../models/patient');

// Function to register a new patient
exports.registerPatient = (req, res) => {
    const patientData = req.body; // Extract patient data from request body
    // Validate the data (you can add more validation as needed)
    if (!patientData.name || !patientData.age || !patientData.contact) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Use the Patient model to create a new patient
    Patient.create(patientData)
        .then(patient => {
            res.status(201).json(patient); // Send success response
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to register patient' }); // Handle errors
        });
};

// Function to retrieve the list of patients
exports.getPatients = (req, res) => {
    // Use the Patient model to retrieve the list of patients
    Patient.findAll()
        .then(patients => {
            res.status(200).json(patients); // Send retrieved patients
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to retrieve patients' }); // Handle errors
        });
};

// Function to retrieve a patient by ID
exports.getPatientById = (req, res) => {
    const { id } = req.params; // Extract patient ID from request parameters
    // Use the Patient model to find the patient by ID
    Patient.findByPk(id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            res.status(200).json(patient); // Send retrieved patient
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to retrieve patient' }); // Handle errors
        });
};

// Function to update a patient
exports.updatePatient = (req, res) => {
    const { id } = req.params; // Extract patient ID from request parameters
    const updatedData = req.body; // Extract updated patient data from request body
    // Use the Patient model to find the patient and update their information
    Patient.findByPk(id)
        .then(patient => {
            if (!patient) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            return patient.update(updatedData);
        })
        .then(updatedPatient => {
            res.status(200).json(updatedPatient); // Send updated patient information
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to update patient' }); // Handle errors
        });
};

// Function to delete a patient
exports.deletePatient = (req, res) => {
    const { id } = req.params; // Extract patient ID from request parameters
    // Use the Patient model to find the patient and delete them
    Patient.destroy({ where: { id } })
        .then(deleted => {
            if (!deleted) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            res.status(204).send(); // Send no content response
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to delete patient' }); // Handle errors
        });
};
