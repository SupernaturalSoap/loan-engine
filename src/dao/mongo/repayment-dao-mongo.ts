import Repayment from '../../models/repayment';
import RepaymentDao from '../repayment-dao';

import MongoDao from '../../utils/dao/mongo.dao';

export default class RepaymentDaoMongo extends MongoDao<string, Repayment> implements RepaymentDao {
    constructor() {
        super('repayments');
    }
}