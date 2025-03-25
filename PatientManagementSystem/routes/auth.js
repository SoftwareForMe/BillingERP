const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for authentication
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register); // Added registration route
router.post('/reset-password', authController.resetPassword); // Added password reset route

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirect to login if not authenticated
};

router.get('/dashboard', isAuthenticated, authController.dashboard); // Protected route

module.exports = router;
