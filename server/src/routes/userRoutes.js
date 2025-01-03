import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';

// Get the loged users infos
router.get('/', authenticateToken, async (req, res) => {
    let userInfo = null;
    try {
        const { data, error } = await supabaseConnection
            .from('user')
            .select('id, email, name, pseudo, bio, profile_picture')
            .eq('id', req.user.id);
        if (error) {
            throw error;
        }
      
        if (data.length != 0) {
            userInfo = data[0];
        }
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({
        success: true,
        message: "User info retrieved successfully",
        user: userInfo
    });
});

export default router;