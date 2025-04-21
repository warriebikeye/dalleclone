// router.js
import express from 'express';
import dalleRoutes from './routes/dalleRoutes.js';
import nupostRoutes from './routes/nupostRoutes.js';

const router = express.Router();

router.use('/dalle', dalleRoutes);
router.use('/post', nupostRoutes);

export default router;
