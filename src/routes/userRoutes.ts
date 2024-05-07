import express from 'express'
const router = express.Router();
import UserController from '../controllers/userController';

// User authentication routes
router.post('/login', UserController.login);
router.post('/new_user', UserController.newUser);
router.get('/profile', UserController.profile);



export default router;
