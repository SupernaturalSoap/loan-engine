import LoanSvc from "../src/svc/loan-svc";

const loanSvc = new LoanSvc();

const uuvidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;

let loanId: string;

const loanPayload = {
    "userId": "256",
    "amount": "10000",
    "tenure": "3"
};


describe('createLoan', () => {
    test('return an loan Id', async () => {
        const res: any = await loanSvc.create(loanPayload);
        loanId = res.body.data;
        expect(res.body.data).toMatch(uuvidRegex);
    });
});

describe('getLoanById', () => {
    test('return an event object', async () => {
        const loan = await loanSvc.findById("256",loanId);
        expect(loan).toMatchObject({
            amount: expect.any(String),
            status: expect.any(String),
            tenure: expect.any(String),
            userId: expect.any(String),
            id    : expect.any(String),
        });
    });
});

