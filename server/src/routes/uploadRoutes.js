import { fileURLToPath } from 'url';

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import supabaseConnection from '../database/supabaseClient.js';


// TODO : Change later
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Set up multer for handling file images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../images');
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


router.post('/newImage', upload.single('image'), async (req, res) => {
    // console.log(req.file)

    const { title } = req.body;

    if (!title || !req.file) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (title or image)"
        });
    }

    try {
        const img_url = `/images/${req.file.filename}`;

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

export default router;
