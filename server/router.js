// router.js
import express from 'express';
import dalleRoutes from './routes/dalleRoutes.js';
import nupostRoutes from './routes/nupostRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';

const router = express.Router();


router.use('/gemini', geminiRoutes);
router.use('/dalle', dalleRoutes);
router.use('/post', nupostRoutes);

export default router;
