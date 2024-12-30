import express from 'express';
const router = express.Router();

import { hashPassword, comparePassword } from "../lib/password.js";
import { authenticateToken } from '../lib/auth.js';

router.get('/', (req, res) => {
    res.json({ message: 'this is the auth route' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // TODO
});

export default router;