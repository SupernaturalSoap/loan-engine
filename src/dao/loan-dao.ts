import Loan from "../models/loan";
import Dao from "../utils/dao/dao";

export default interface LoanDao extends Dao<string, Loan> {}