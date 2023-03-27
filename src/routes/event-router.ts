import { Request, Response, NextFunction, Router } from 'express';

import Event from '../models/event';
import EventSvc from '../svc/event-svc';

const router: Router = Router();

const eventSvc: EventSvc = new EventSvc();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = '1', size = '100' } = req.query as any;
        const events: Event[] = await eventSvc.findAll(page, size);

        res.status(200).json({ message: 'Successful', data: events });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = await eventSvc.create(req.body);
        res.status(201).json({ message: 'Successful', data: event });
    } catch (err) {
        next(err);
    }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = await eventSvc.update(req.body.id, req.body);
        res.status(200).json({ message: 'Successful', data: event });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event: Event = await eventSvc.findById(req.params.id);
        res.send({ message: 'Sucessful', data: event ? event : null });
    } catch (err) {
        next(err);
    }
});

export default router;