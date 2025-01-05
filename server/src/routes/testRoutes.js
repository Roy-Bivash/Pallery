import express from 'express';
const router = express.Router();
import { authenticateToken } from '../lib/auth.js';

router.get('/', authenticateToken, async (req, res) => {
    res.json({ 
        message: 'this is the test route',
    });
});

export default router;