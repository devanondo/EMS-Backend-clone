import { Router } from 'express';
import { demoRoutes } from './demoRoutes.js';

const router = Router();

router.use('/demo', demoRoutes);

export default router;
