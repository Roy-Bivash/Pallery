import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';
import {hashPassword} from '../lib/password.js';

router.get('/', authenticateToken, async (req, res) => {
    const { data, error } = await supabaseConnection
        .rpc('update_user_profile_picture', {
            user_id: req.user.id,
            new_picture: "test"
        })


    if (error) {
        throw error;
    }

        console.log(data);
    res.json({ 
        message: 'this is the test route',
        // mdp: await hashPassword('biv'),
        data,
        // count,
        error
    });
});

export default router;