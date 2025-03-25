const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db'); // Correctly import the sequelize instance

const User = sequelize.define('User', {  
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Registrar', 'Doctor', 'Customer'), allowNull: false },
    contact: { type: DataTypes.STRING, allowNull: false },
    hashedPassword: { type: DataTypes.STRING, allowNull: false }
}, {
    // Hook to validate contact before saving
    hooks: {
        beforeSave: (user) => {
            const phoneRegex = /^[0-9]{10}$/; // Example regex for 10-digit phone numbers
            if (!phoneRegex.test(user.contact)) {
                throw new Error('Contact must be a valid 10-digit phone number');
            }
        }
    }
});

module.exports = User;
