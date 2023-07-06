import { Request, Response, NextFunction, Router } from 'express';

import Loan from '../models/loan';
import LoanSvc from '../svc/loan-svc';

const router: Router = Router();

const loanSvc: LoanSvc = new LoanSvc();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = '1', size = '100' } = req.query as any;
        const loans: Loan[] = await loanSvc.findAll(page, size);

        res.status(200).json({ message: 'Successful', data: loans });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const loan = await loanSvc.create(req.body);
        res.status(201).json({ message: 'Successful', data: loan });
    } catch (err) {
        next(err);
    }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const loan = await loanSvc.update(req.body.id, req.body);
        res.status(200).json({ message: 'Successful', data: loan });
    } catch (err) {
        next(err);
    }
});

router.get('/:uid/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const loan: Loan = await loanSvc.findById(req.params.uid, req.params.id);
        res.send({ message: 'Sucessful', data: loan ? loan : null });
    } catch (err) {
        next(err);
    }
});

export default router;