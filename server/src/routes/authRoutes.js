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

/**
 * Verify if the password has at least 8 characters and 1 number in it
 * @param STRING password 
 * @returns boolean
 */
function verifyPassword(password) {
    const regex = /^(?=.*\d).{8,}$/;

    return (regex.test(password));
}

router.post('/signIn', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            error: 'Invalid input',
            message: 'Missing parametters',
        });
    }

    // Verify the new password validity
    if(!verifyPassword(password)){
        return res.json({ 
            success: false, 
            message: "The password does not meet the requirements" 
        });
    }

    // Hash the password before inserting to the database :
    const passwordHash = await hashPassword(password);

    // Create the default pseudo :
    const pseudo = `@${name.replace(/[ ,!?@]/g, '_')}`;

    try{
        const { error } = await supabaseConnection
            .from('user')
            .insert([
                { 
                    email,
                    password: passwordHash,
                    name,
                    pseudo
                },
            ]);
        if (error) {
            throw error;
        }
    } catch (err) {
        console.error('Error fetching data from Supabase:', err.message);
        res.status(500).json({ error: 'Failed to fetch data from Supabase' });
    }

    return res.json({
        success: true,
        message: "Account created"
    });
});


export default router;