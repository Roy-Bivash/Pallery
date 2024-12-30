import { fileURLToPath } from 'url';

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// TODO : Change later
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
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


router.post('/newPossibility', upload.single('picture'), async (req, res) => {
    // console.log(req.file)

    const db = req.db;
    const { private_code, name } = req.body;

    if (!private_code || !name || !req.file) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (private_code, name, or picture)"
        });
    }

    try {
        // Find survey by private link to get its ID
        const survey = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM survey WHERE private_link = ?;', [private_code], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        if (!survey) {
            return res.status(404).json({
                success: false,
                message: "Survey not found"
            });
        }

        // Prepare image URL based on file path
        const img_url = `/uploads/${req.file.filename}`;

        // Insert the new possibility into the database
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO possibilitys (num_survey, nom, img_url) VALUES (?, ?, ?);',
                [survey.id, name, img_url],
                function (err) {
                    if (err) return reject(err);
                    resolve(this);
                }
            );
        });

        res.status(201).json({
            success: true,
            message: "New possibility added successfully"
        });

    } catch (error) {
        console.error("Error adding new possibility:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router;
