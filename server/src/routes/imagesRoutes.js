import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';


// Return all the images of the connected user
router.get('/', authenticateToken, async (req, res) => {
    let images = [];

    try {
        const { data, error } = await supabaseConnection
            .from('images')
            .select('id, url, title, folder_id')
            .eq('user_id', req.user.id);
        if (error) {
            throw error;
        }
        images = data;
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ 
        success: true,
        message: `All the images of ${req.user.name}`,
        images
    });
});


export default router;