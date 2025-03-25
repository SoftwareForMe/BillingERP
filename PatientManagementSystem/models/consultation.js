const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db'); // Correctly import the sequelize instance

const Consultation = sequelize.define('Consultation', {
    patientID: { type: DataTypes.INTEGER, allowNull: false },
    doctorID: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    consultationFee: { type: DataTypes.FLOAT, allowNull: false },
    services: { type: DataTypes.STRING },
}, {
    // Hook to validate consultation fee before saving
    hooks: {
        beforeSave: (consultation) => {
            if (consultation.consultationFee <= 0) {
                throw new Error('Consultation fee must be greater than zero');
            }
        }
    }
});

module.exports = Consultation;
