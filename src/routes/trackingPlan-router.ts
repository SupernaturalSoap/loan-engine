import { Request, Response, NextFunction, Router } from 'express';
import trackingPlan from '../models/trackingPlan';

import TrackingPlan from '../models/trackingPlan';
import TrackingPlanSvc from '../svc/trackingPlan-svc';

const router: Router = Router();

const trackingPlanSvc: TrackingPlanSvc = new TrackingPlanSvc();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = '1', size = '100' } = req.query as any;
        const trackingPlans: trackingPlan[] = await trackingPlanSvc.findAll(page, size);

        res.status(200).json({ message: 'Successful', data: trackingPlans });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = await trackingPlanSvc.create(req.body);
        res.status(201).json({ message: 'Successful', data: event });
    } catch (err) {
        next(err);
    }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const trackingPlan = await trackingPlanSvc.update(req.body.id, req.body);
        res.status(200).json({ message: 'Successful', data: trackingPlan });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const trackingPlan: TrackingPlan = await trackingPlanSvc.findById(req.params.id);
        res.send({ message: 'Sucessful', data: trackingPlan ? trackingPlan : null });
    } catch (err) {
        next(err);
    }
});

export default router;