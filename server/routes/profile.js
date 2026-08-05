const express = require('express');
const router = express.Router();

// Mock profile data store (matches users in memory)
let profiles = {
    "admin": {
        fullName: "Administrator",
        email: "admin@example.com",
        bio: "System administrator managing the MERN workspace.",
        activeProjects: 5,
        completedTasks: 28,
        memberSince: "2026"
    }
};

// GET Profile Route
router.get('/:username', (req, res) => {
    const { username } = req.params;
    const profile = profiles[username] || {
        fullName: username,
        email: `${username}@example.com`,
        bio: "New MERN stack user.",
        activeProjects: 0,
        completedTasks: 0,
        memberSince: "2026"
    };

    res.status(200).json({ success: true, profile });
});

// UPDATE Profile Route
router.put('/:username', (req, res) => {
    const { username } = req.params;
    const { fullName, email, bio } = req.body;

    // Update or initialize profile
    profiles[username] = {
        ...(profiles[username] || {}),
        fullName,
        email,
        bio
    };

    res.status(200).json({ 
        success: true, 
        message: "Profile updated successfully!", 
        profile: profiles[username] 
    });
});

module.exports = router;