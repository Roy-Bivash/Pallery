import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';

router.get('/', authenticateToken, async (req, res) => {
    const { data, error } = await supabaseConnection
        .rpc('get_user_images_with_favorites', { user_id_var: 1 });
  
    if(error){
        console.log(error)
    }
    res.json({ 
        message: 'this is the test route',
        data,
        error
    });
});

export default router;