const express = require('express');
const router = express.Router();

// In-memory user store (starts with the default admin user)
let users = [
    { username: "admin", password: "password123" }
];

// Register Route
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already exists" });
    }

    users.push({ username, password });
    res.status(201).json({ success: true, message: "Registration successful! Please log in." });
});

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.status(200).json({ 
            success: true, 
            message: "Login successful!", 
            user: { username: user.username } 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Invalid username or password" 
        });
    }
});

module.exports = router;