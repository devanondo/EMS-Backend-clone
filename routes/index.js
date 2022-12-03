import { Router } from 'express';
import { clientRoute } from './clientRoute.js';
import { demoRoutes } from './demoRoutes.js';
import { userRoute } from './userRoute.js';

const router = Router();

router.use('/demo', demoRoutes);

//User route
router.use('/user', userRoute);

//Client Route
router.use('/client', clientRoute);

export default router;
