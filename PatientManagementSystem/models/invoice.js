const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db'); // Correctly import the sequelize instance

const Invoice = sequelize.define('Invoice', {
    patientID: { type: DataTypes.INTEGER, allowNull: false },
    paymentID: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    paymentStatus: { type: DataTypes.ENUM('Paid', 'Pending'), defaultValue: 'Pending' },
}, {
    // Hook to validate total amount before saving
    hooks: {
        beforeSave: (invoice) => {
            if (invoice.totalAmount <= 0) {
                throw new Error('Total amount must be greater than zero');
            }
        }
    }
});

module.exports = Invoice;
