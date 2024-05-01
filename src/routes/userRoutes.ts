import express from 'express'
const router = express.Router();
const UserController = require('../controllers/userController');

// User authentication routes
router.post('/login', UserController.login);
router.post('/new_user', UserController.newUser);
router.get('/profile', UserController.profile);



module.exports = router;
