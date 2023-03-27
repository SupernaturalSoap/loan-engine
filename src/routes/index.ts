import { Router } from 'express';

import EventRoutes from './event-router';
import TrackingPlanRoutes from './trackingPlan-router';

const router: Router = Router();

router.use('/event', EventRoutes);
router.use('/trackingPlan', TrackingPlanRoutes);

export default router;