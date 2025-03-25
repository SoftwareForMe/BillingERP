const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize('sqlite:./database.sqlite');

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to SQLite has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Synchronize models with the database
const syncDB = async () => {
    try {
        await sequelize.sync(); // This will create the tables if they do not exist
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

module.exports = { sequelize, connectDB, syncDB }; // Ensure connectDB and syncDB are exported
