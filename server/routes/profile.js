/**
 * Profile Routes
 * Handles user profile retrieval and updates
 * Uses in-memory storage for profile data
 */

const express = require('express');
const router = express.Router();

// Mock profile data store - stores user profiles by username
// Each profile contains personal info, activity stats, and membership details
let profiles = {
    "admin": {
        fullName: "Administrator",
        email: "admin@example.com",
        bio: "System administrator managing the MERN workspace.",
        activeProjects: 5,      // Number of active projects for the user
        completedTasks: 28,     // Total tasks completed by the user
        memberSince: "2026"    // Year the user joined
    }
};

/**
 * GET /api/profile/:username
 * Retrieves the profile for a specific user
 * @param {string} username - The username to fetch the profile for
 * @returns {object} Profile object with user details or default profile for new users
 */
router.get('/:username', (req, res) => {
    const { username } = req.params;
    // Retrieve existing profile or create a default profile for new users
    const profile = profiles[username] || {
        fullName: username,
        email: `${username}@example.com`,
        bio: "New MERN stack user.",
        activeProjects: 0,
        completedTasks: 0,
        memberSince: "2026"
    };

    // Return profile data with success status
    res.status(200).json({ success: true, profile });
});

/**
 * PUT /api/profile/:username
 * Updates the profile information for a specific user
 * @param {string} username - The username to update
 * @body {object} fullName, email, bio - Profile fields to update
 * @returns {object} Updated profile object
 */
router.put('/:username', (req, res) => {
    const { username } = req.params;
    const { fullName, email, bio } = req.body; // Extract profile fields from request body

    // Update existing profile or create new one with spread operator
    // Preserves any existing fields not being updated
    profiles[username] = {
        ...(profiles[username] || {}),
        fullName,
        email,
        bio
    };

    // Return success response with updated profile data
    res.status(200).json({ 
        success: true, 
        message: "Profile updated successfully!", 
        profile: profiles[username] 
    });
});

// Export router for use in main server configuration
module.exports = router;