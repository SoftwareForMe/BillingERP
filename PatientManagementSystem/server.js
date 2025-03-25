const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const { connectDB } = require('./utils/db');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const consultationRoutes = require('./routes/consultations');
const paymentRoutes = require('./routes/payments');
const invoiceRoutes = require('./routes/invoices');
require('dotenv').config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use environment variable for secret
    resave: false, 
    saveUninitialized: true 
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Routes
app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/consultations', consultationRoutes);
app.use('/payments', paymentRoutes);
app.use('/invoices', invoiceRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
