import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import testRoutes from './routes/testRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

// TODO : Change later
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

// Use different routers for specific route paths
router.use('/test', express.json({ limit: '10mb' }), testRoutes);
router.use('/auth', express.json({ limit: '10mb' }), authRoutes);
router.use('/images', express.json({ limit: '10mb' }), imageRoutes);
router.use('/upload', uploadRoutes);
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


export default router;
