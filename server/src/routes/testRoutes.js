import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';
import {hashPassword} from '../lib/password.js';

router.get('/', authenticateToken, async (req, res) => {
    // const { data, error, count } = await supabaseConnection
    //         .from('images')
    //         .select("*",  { count: "exact", head: true })
    //         .eq('user_id', req.user.id);
    // if(error){
    //     console.log(error)
    // }
    res.json({ 
        message: 'this is the test route',
        mdp: await hashPassword('biv')
        // data,
        // count,
        // error
    });
});

export default router;