export default interface repayment {
    loanId: string,
    userId: string,
    amount: string,
    status: string,
    scheduledPaymentDate: string,
    createdAt?: string,
    updatedAt?: string
}