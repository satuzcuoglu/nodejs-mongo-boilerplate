import { Router } from 'express';
import { authenticate } from '../config/authenticate';
import * as AuthController from '../controllers/auth';

const router = new Router();

// Register
router.post('/regiser', AuthController.register);

// Login
router.post('/login', AuthController.login);

// Get Authenticated User
router.get('/me', authenticate, AuthController.checkUser);

export default router;
