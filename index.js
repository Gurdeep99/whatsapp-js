require('dotenv').config(); // Load .env variables

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to check for Bearer Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Access token from .env file
    const predefinedToken = process.env.SECRET_TOKEN;

    if (!token) return res.status(401).json({ message: 'Token not provided' });
    if (token !== predefinedToken) return res.status(403).json({ message: 'Invalid token' });

    next();
};

// Hello World endpoint with Bearer authentication
app.get('/api/hello', authenticateToken, (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
