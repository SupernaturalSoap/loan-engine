import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/client/logger';

import RepaymentSvc from './repayment-svc';

import Loan from '../models/loan';
import LoanDaoMongo from '../dao/mongo/loan-dao-mongo';

export default class LoanSvc {
    private loanDao: LoanDaoMongo;
    private repaymentSvc: RepaymentSvc

    constructor() {
        this.loanDao = new LoanDaoMongo();
        this.repaymentSvc = new RepaymentSvc();
    }

    async create(context: any) {

        const loanId = uuidv4();
        if(!context?.userId || !context?.tenure || !context?.amount) {
            throw new Error('INVALID_LOAN');
        }

        const loan: Loan = {
            userId: context?.userId,
            amount: context.amount,
            tenure: context.tenure,
            status: "PENDING",
        }

        await this.loanDao.upsert(loanId, loan);

        // all loan will have weekly repayment frequency.
        const repaymentAmount = parseFloat(loan.amount)/parseFloat(loan.tenure);
        for(let i=0; i<parseInt(loan.tenure); i++) {
            const repayment = {
                loanId: loanId,
                userId: loan.userId,
                amount: `${repaymentAmount}`,
                scheduledPaymentDate: new Date().getTime() + (7*(i+1) * 24 * 3600 * 1000)
            };
            await this.repaymentSvc.create(repayment);
        }

        logger.info(`Loan created with ID ${loanId}`);

        return loanId;
    }

    async update(id: string, context: any) {
        const loan: Loan = await this.loanDao.findById(id);

        if(!loan) {
            throw new Error('INVALID_EVENT_ID');
        }

        delete context.id;
        const update: any = { ...loan, ...context };

        await this.loanDao.upsert(id, update);
        logger.info(`Loan updated with status: ${loan.status} and id: ${id}`);

        return update;
    }

    async findById(userId: string, id: string) {
        const loan = await this.loanDao.findById(id);
        if(loan.userId != userId) {
            throw new Error("INVALID_CUSTOMER");
        }
        return loan;
    }

    async findAll(page: string, size: string) {
        const limit = parseInt(size);
        const skip = (parseInt(page) - 1) * limit;
        return this.loanDao.findAll(skip, limit);
    }
}