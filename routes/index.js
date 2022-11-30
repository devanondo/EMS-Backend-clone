import { Router } from 'express';
import { demoRoutes } from './demoRoutes.js';
import { userRoute } from './userRoute.js';

const router = Router();

router.use('/demo', demoRoutes);

//User route
router.use('/user', userRoute);

export default router;
