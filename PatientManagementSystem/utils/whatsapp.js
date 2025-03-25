const axios = require('axios');
const config = require('../config/config');

// Function to send invoice via WhatsApp
const sendInvoice = async (invoiceData) => {
    try {
        // Validate invoice data
        if (!invoiceData || !invoiceData.id) {
            throw new Error('Invalid invoice data');
        }

        // Logic to send invoice via WhatsApp API
        const response = await axios.post('https://api.whatsapp.com/send', {
            // Include necessary data for the API call
            apiKey: config.whatsappAPIKey,
            message: `Invoice Details: ${JSON.stringify(invoiceData)}`,
            // Other required parameters
        });

        // Check response status
        if (response.status !== 200) {
            throw new Error('Failed to send invoice');
        }

        return response.data;
    } catch (error) {
        console.error('Error sending invoice via WhatsApp:', error);
        throw error;
    }
};

module.exports = { sendInvoice };
