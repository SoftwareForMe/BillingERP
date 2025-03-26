const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ 
    secret: 'your_secret_key',
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

// Sample data for preview
const sampleData = {
    stats: {
        totalPatients: 150,
        todayAppointments: 8,
        pendingPayments: 5,
        totalRevenue: 15000
    },
    recentPatients: [
        {
            id: 'P001',
            name: 'Alice Johnson',
            age: 35,
            contact: '+1234567890',
            email: 'alice@example.com',
            lastVisit: new Date(),
            status: 'Active'
        }
    ]
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('home', { layout: false });
});

app.get('/auth/login', (req, res) => {
    res.render('auth/login', { layout: false });
});

app.get('/auth/signup', (req, res) => {
    res.render('auth/signup', { layout: false });
});

// Login handler
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    // For demo purposes, we'll use hardcoded credentials
    if (username === 'doctor' && password === 'password') {
        req.session.user = {
            id: 'D001',
            name: 'Dr. John Doe',
            role: 'doctor'
        };
        res.redirect('/doctor/dashboard');
    } else if (username === 'registrar' && password === 'password') {
        req.session.user = {
            id: 'R001',
            name: 'Jane Smith',
            role: 'registrar'
        };
        res.redirect('/registrar/dashboard');
    } else {
        res.render('auth/login', { 
            layout: false,
            error: 'Invalid credentials'
        });
    }
});

// Signup handler
app.post('/auth/signup', (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        role,
        specialization,
        licenseNumber,
        username,
        password
    } = req.body;

    // Here we would normally:
    // 1. Validate the input
    // 2. Check if username/email already exists
    // 3. Hash the password
    // 4. Save to database
    
    // For demo, we'll just redirect to login with a success message
    res.render('auth/login', {
        layout: false,
        success: 'Account created successfully! Please login with your credentials.'
    });
});

// Protected routes
app.get('/registrar/dashboard', isAuthenticated, (req, res) => {
    if (req.session.user.role !== 'registrar') {
        return res.redirect('/doctor/dashboard');
    }
    res.render('registrar/dashboard', { 
        ...sampleData,
        user: req.session.user,
        page: 'dashboard'
    });
});

app.get('/doctor/dashboard', isAuthenticated, (req, res) => {
    if (req.session.user.role !== 'doctor') {
        return res.redirect('/registrar/dashboard');
    }
    res.render('doctor/dashboard', { 
        ...sampleData,
        user: req.session.user,
        page: 'dashboard'
    });
});

// Consultation routes
app.get('/consultations/new', isAuthenticated, (req, res) => {
    if (req.session.user.role !== 'doctor') {
        return res.redirect('/auth/login');
    }
    const consultationData = {
        user: req.session.user,
        page: 'consultations',
        patients: [
            {
                id: 'P001',
                name: 'Alice Johnson',
                age: 35,
                gender: 'Female',
                bloodGroup: 'O+',
                lastVisit: new Date()
            },
            {
                id: 'P002',
                name: 'Bob Smith',
                age: 45,
                gender: 'Male',
                bloodGroup: 'A+',
                lastVisit: new Date()
            }
        ]
    };
    res.render('doctor/consultation', consultationData);
});

app.post('/consultations', isAuthenticated, (req, res) => {
    if (req.session.user.role !== 'doctor') {
        return res.redirect('/auth/login');
    }
    // Here we would normally save the consultation to the database
    // For demo, we'll just redirect back to dashboard
    res.redirect('/doctor/dashboard');
});

app.get('/patients/history', isAuthenticated, (req, res) => {
    const patientData = {
        patient: {
            id: 'P001',
            name: 'Alice Johnson',
            age: 35,
            gender: 'Female',
            bloodGroup: 'O+',
            contact: '+1234567890',
            email: 'alice@example.com',
            status: 'Active',
            consultations: [
                {
                    id: 'C001',
                    doctorName: 'Dr. John Doe',
                    date: new Date(),
                    chiefComplaint: 'Fever and headache',
                    diagnosis: 'Viral fever',
                    treatment: 'Prescribed antipyretics'
                }
            ],
            prescriptions: [
                {
                    id: 'PR001',
                    doctorName: 'Dr. John Doe',
                    date: new Date(),
                    medications: [
                        {
                            name: 'Paracetamol',
                            dosage: '500mg',
                            duration: '3 days',
                            instructions: 'Take after meals'
                        }
                    ]
                }
            ],
            labReports: [
                {
                    id: 'L001',
                    testName: 'Blood Test',
                    date: new Date(),
                    status: 'Completed',
                    referredBy: 'Dr. John Doe'
                }
            ],
            payments: [
                {
                    date: new Date(),
                    invoiceId: '001',
                    amount: 100,
                    status: 'Paid',
                    mode: 'Cash'
                }
            ]
        },
        user: req.session.user
    };
    res.render('patients/history', patientData);
});

// Logout route
app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});