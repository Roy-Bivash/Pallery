import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

import { config } from '../config/config.js';
import supabaseConnection from '../database/supabaseClient.js';
import { hashPassword, comparePassword } from "../lib/password.js";
import { authenticateToken } from '../lib/auth.js';

router.get('/', (req, res) => {
    res.json({ message: 'this is the auth route' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const { data, error } = await supabaseConnection
            .from('user')
            .select('*')
            .eq('email', email);
        if (error) {
          throw error;
        }

        // If the email does not exist :
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: "Error: Login or password incorrect" });
        }

        const user = data[0];
        const match = await comparePassword(password, user.password);

        if (match) {
            // Generate JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    profile_picture: user.profile_picture,
                },
                config.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Set the token as an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', 
                maxAge: 3600000,
            });

            return res.json({
                success: true,
                message: "Login successful",
            });
        }

        // If there is no password match :
        return res.status(401).json({ success: false, message: "Error: Login or password incorrect" });

    } catch (err) {
        console.error('Error fetching data from Supabase:', err.message);
        res.status(500).json({ error: 'Failed to fetch data from Supabase' });
    }

});

// This route checks if the user is logged in
router.get('/isLoggedIn', authenticateToken, (req, res) => {
    // If the middleware passes, it means the user is authenticated
    res.json({
        success: true,
        message: "User is logged in",
    });
});


router.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0, // This immediately expires the cookie
    });

    return res.json({
        success: true,
        message: "Logged out successfully"
    });
});


export default router;