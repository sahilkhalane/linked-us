const express = require('express');
const { getUserProfile, getMyProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/users/me → current user's profile
router.get('/me', protect, getMyProfile);

// GET /api/users/:id → public profile
router.get('/:id', getUserProfile);

module.exports = router;
