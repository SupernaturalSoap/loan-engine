import Repayment from "../models/repayment";
import Dao from "../utils/dao/dao";

export default interface RepaymentDao extends Dao<string, Repayment> {}