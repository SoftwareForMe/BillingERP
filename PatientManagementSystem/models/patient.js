const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db'); // Correctly import the sequelize instance

const Patient = sequelize.define('Patient', {  
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    contact: { type: DataTypes.STRING, allowNull: false },
    medicalHistory: { type: DataTypes.STRING }
}, {
    // Hook to validate age before saving
    hooks: {
        beforeSave: (patient) => {
            if (patient.age <= 0) {
                throw new Error('Age must be a positive integer');
            }
        }
    }
});

module.exports = Patient;
