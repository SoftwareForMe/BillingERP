const User = require('../models/user');

// Function to handle user login
exports.login = (req, res) => {
        const { username, password } = req.body; // Extract user credentials from request body
    // Validate the credentials
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    // Use the User model to find the user
    User.findOne({ where: { username } })
        .then(user => {
            if (!user || !user.validatePassword(password)) { // Assuming validatePassword is a method on the User model
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            // Generate a session or token (this is a placeholder, implement your own logic)
            const token = generateToken(user); // Placeholder for token generation
            res.status(200).json({ token }); // Send success response with token
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to login' }); // Handle errors
        });
};

exports.register = (req, res) => {
    const { username, password } = req.body; // Extract user credentials from request body
    // Validate the credentials
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    // Use the User model to create a new user
    User.create({ username, password }) // Assuming password is hashed in the model
        .then(user => {
            res.status(201).json({ message: 'User registered successfully', user });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to register user' }); // Handle errors
        });
};

exports.resetPassword = (req, res) => {
    const { username, newPassword } = req.body; // Extract user credentials from request body
    // Validate the credentials
    if (!username || !newPassword) {
        return res.status(400).json({ error: 'Username and new password are required' });
    }
    // Use the User model to find the user and update the password
    User.findOne({ where: { username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            user.password = newPassword; // Assuming password is hashed in the model
            return user.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Password reset successfully' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to reset password' }); // Handle errors
        });
};
exports.dashboard = (req, res) => {
    // Render the dashboard view for authenticated users
    if (req.isAuthenticated()) {
        res.render('doctor/dashboard'); // Render the dashboard view
    } else {
        res.redirect('/login'); // Redirect to login if not authenticated
    }
};
        exports.logout = (req, res) => {
    // Invalidate the user's session or token (this is a placeholder, implement your own logic)
    req.session = null; // Example for session invalidation
    res.status(200).json({ message: 'Successfully logged out' }); // Send success response
};