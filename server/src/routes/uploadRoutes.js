import { fileURLToPath } from 'url';

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';


// TODO : Change later
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Set up multer for handling file images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../image');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    }
});

router.post('/newImage', authenticateToken, upload.single('image'), async (req, res) => {

    const { title } = req.body;

    if (!title || !req.file) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (title or image)"
        });
    }

    try {
        const img_url = `/image/${req.file.filename}`;

        const { data, error } = await supabaseConnection
            .from('images')
            .insert([
                { url: img_url, title, user_id: req.user.id },
            ])
            .select()
        
        if (error) {
            throw error;
        }
        
        res.json({ 
            success: true,
            message: "Image added",
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

async function deleteImgFromFilesystem(url) {
    const filePath = path.join(__dirname, `..${url}`);
    try {
        await fs.promises.unlink(filePath);
        return { success: true };
    } catch (error) {
        return { error: `File deletion failed: ${error.message}` };
    }
}

router.post('/newProfilePicture', authenticateToken, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (title or image)"
        });
    }

    try {
        const img_url = `/image/${req.file.filename}`;

        // change the profile_picture from the databse
        const { data, error } = await supabaseConnection
            .rpc('update_user_profile_picture', {
                user_id: req.user.id,
                new_picture: img_url
            })
        
        if (error) {
            throw error;
        }

        // Delete the old profile picture from the server
        if(data[0].old_profile_picture){
            const { error: fsError } = await deleteImgFromFilesystem(data[0].old_profile_picture);
            if(fsError){
                throw "Error: File deletion error";
            }
        }

        res.json({ 
            success: true,
            message: "Image added",
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
