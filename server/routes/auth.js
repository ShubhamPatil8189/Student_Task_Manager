const express = require('express');
const router = express.Router();

// In-memory user store (starts with the default admin user)
let users = [
    { username: "admin", password: "password123" }
];

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