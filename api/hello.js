// api/hello.js
require('dotenv').config();

module.exports = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const predefinedToken = process.env.SECRET_TOKEN;

    if (!token) return res.status(401).json({ message: 'Token not provided' });
    if (token !== predefinedToken) return res.status(403).json({ message: 'Invalid token' });

    res.json({ message: 'Hello, World!' });
};
