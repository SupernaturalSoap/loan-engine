import { Request, Response, NextFunction, Router } from 'express';

import Repayment from '../models/repayment';
import RepaymentSvc from '../svc/repayment-svc';

const router: Router = Router();

const repaymentSvc: RepaymentSvc = new RepaymentSvc();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = '1', size = '100' } = req.query as any;
        const repayments: Repayment[] = await repaymentSvc.findAll(page, size);

        res.status(200).json({ message: 'Successful', data: repayments });
    } catch (err) {
        next(err);
    }
});

router.get('/:loanId/getLoanRepayments', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repayment = await repaymentSvc.findByLoanId(req.params.loanId);
        res.status(200).json({ message: 'Successful', data: repayment });
    } catch (err) {
        next(err);
    }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repayment = await repaymentSvc.update(req.body.id, req.body);
        res.status(200).json({ message: 'Successful', data: repayment });
    } catch (err) {
        next(err);
    }
});

router.post('/repay', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repayment = await repaymentSvc.repay(req.body);
        res.status(200).json({ message: 'Successful', data: repayment });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repayment: Repayment = await repaymentSvc.findById(req.params.id);
        res.send({ message: 'Sucessful', data: repayment ? repayment : null });
    } catch (err) {
        next(err);
    }
});

export default router;