const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db'); // Correctly import the sequelize instance

const Payment = sequelize.define('Payment', {  
    patientID: { type: DataTypes.INTEGER, allowNull: false },
    mode: { type: DataTypes.ENUM('Cash', 'Card', 'UPI'), allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    // Hook to validate amount before saving
    hooks: {
        beforeSave: (payment) => {
            if (payment.amount <= 0) {
                throw new Error('Amount must be greater than zero');
            }
        }
    }
});

module.exports = Payment;
