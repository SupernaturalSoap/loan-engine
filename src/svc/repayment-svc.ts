import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/client/logger';

import LoanDaoMongo from '../dao/mongo/loan-dao-mongo';
import Repayment from '../models/repayment';
import RepaymentDaoMongo from '../dao/mongo/repayment-dao-mongo';

export default class RepaymentSvc {
    private repaymentDao: RepaymentDaoMongo;
    private loanDaoMongo: LoanDaoMongo;

    constructor() {
        this.repaymentDao = new RepaymentDaoMongo();
        this.loanDaoMongo = new LoanDaoMongo();
    }

    async create(context: any) {
        
        const repaymentId = uuidv4();
        if(!context?.loanId || !context?.userId || !context?.amount || !context?.scheduledPaymentDate) {
            throw new Error('INVALID_REPAYMENT');
        }

        const repayment: Repayment = {

            userId: context.userId,
            loanId: context.loanId,
            amount: context.amount,
            scheduledPaymentDate: context.scheduledPaymentDate,
            status: 'PENDING'
        }

        await this.repaymentDao.upsert(repaymentId, repayment);
        logger.info(`Repayment created with ID ${repaymentId}`);

        return repaymentId;
    }

    async repay(context: any): Promise<any> {
        if(!context?.repaymentId || !context?.loanId || !context?.amount) {
            throw new Error("INVALID_REPAYMENT");
        }
        const repaymentId = context?.repaymentId
        const repayment: Repayment = await this.repaymentDao.findById(repaymentId);

        const loan = await this.loanDaoMongo.findById(context?.loanId);

        if(!repayment || loan?.status == "PENDING" || !repayment?.amount > context.amount) {
            throw new Error('INVALID_REPAYMENT');
        }

        let updatedRepayment = {...repayment};
        updatedRepayment.status = 'PAID';
        await this.update(repaymentId, updatedRepayment);

        let repaymentsPaid = true;
        (await this.findByLoanId(context.loanId)).forEach((repayment) => {
            if(repayment.status == 'PENDING') {
                repaymentsPaid = false;
            }
        });

        if(repaymentsPaid) {
            let updatedLoan = {...loan};
            updatedLoan.status = 'PAID';
            await this.loanDaoMongo.upsert(context?.loanId, updatedLoan);
        }

        return updatedRepayment
    }

    async update(id: string, context: any) {
        const repayment: Repayment = await this.repaymentDao.findById(id);

        if(!repayment) {
            throw new Error('INVALID_REPAYMENT_ID');
        }

        delete context.id;
        const update: any = context;

        await this.repaymentDao.upsert(id, { ...repayment, ...update });
        logger.info(`Repayment updated with status: ${repayment.status} and id: ${id}`);

        return repayment;
    }

    async findById(id: string) {
        return this.repaymentDao.findById(id);
    }

    async findByLoanId(loanId: string) {
        return this.repaymentDao.find({loanId: loanId});
    }

    async findAll(page: string, size: string) {
        const limit = parseInt(size);
        const skip = (parseInt(page) - 1) * limit;
        return this.repaymentDao.findAll(skip, limit);
    }
}