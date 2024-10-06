const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const rateLimiter = require('../middleware/rateLimiter');

// define the routes
router.post('/Login', rateLimiter, userController.loginUser);
router.post('/Register', rateLimiter, userController.registerUser);
router.get('/userProfile', rateLimiter, authenticateToken, userController.getUserProfile);
router.get('/getAllUsers', rateLimiter, userController.getAllUsers);

module.exports = router;