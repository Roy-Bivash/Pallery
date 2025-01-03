import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import testRoutes from './routes/testRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import imagesRoutes from './routes/imagesRoutes.js';
import userRoutes from './routes/userRoutes.js';

// TODO : Change later
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

// Use different routers for specific route paths
router.use('/test', express.json({ limit: '10mb' }), testRoutes);
router.use('/auth', express.json({ limit: '10mb' }), authRoutes);
router.use('/images', express.json({ limit: '10mb' }), imagesRoutes);
router.use('/user', express.json({ limit: '10mb' }), userRoutes);
router.use('/upload', uploadRoutes);
router.use('/image', express.static(path.join(__dirname, 'image')));


export default router;
