const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// User authentication routes
router.post('/login', UserController.login);
router.post('/new_user', UserController.newUser);

module.exports = router;
