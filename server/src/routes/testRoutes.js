import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';

router.get('/', authenticateToken, async (req, res) => {
    res.json({ 
        message: 'this is the test route',
        data:req.user
    });
});

export default router;