import Loan from '../../models/loan';
import LoanDao from '../loan-dao';

import MongoDao from '../../utils/dao/mongo.dao';

export default class LoanDaoMongo extends MongoDao<string, Loan> implements LoanDao {
    constructor() {
        super('loans');
    }
}