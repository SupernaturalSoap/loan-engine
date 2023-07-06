import { Router } from 'express';

import LoanRoutes from './loan-router';
import RepaymentRouter from './repayment-router';

const router: Router = Router();

router.use('/loan', LoanRoutes);
router.use('/repayment', RepaymentRouter);

export default router;