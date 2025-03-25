const { sequelize } = require('./db'); // Correctly import the sequelize instance
const User = require('../models/user');
const Patient = require('../models/patient');
const Consultation = require('../models/consultation');
const Payment = require('../models/payment');
const Invoice = require('../models/invoice');

const initDB = async () => {
    try {
        await sequelize.sync({ force: true }); // This will create the tables
        console.log('Database & tables created!');

        // Optionally, seed initial data here
        // await User.create({ name: 'Admin', role: 'Registrar', contact: '1234567890', hashedPassword: 'hashedPassword' });
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

initDB();
