# event-engine
## Run in development mode
- Make sure you have all the dependencies installed. Run `npm install` in root.
- Install mongo. Check below to run a Mongo container
- Create .env file in root and add env variables in it
- Execute `npm run start:dev`

## Run in production mode
- Create .env file in root and add env variables in  it
- Install mongo
- Run `./docker.run`

### ENV Variables
```
LANG=en-IN
TZ=Asia/Kolkata
APP_NAME=loan-engine
APP_PORT=9090
APP_LOGGER_DIR=.
APP_LOGGER_LEVEL=debug
APP_MONGO_URL=mongodb://localhost/loan-engine
APP_MONGO_DB_NAME=loan-engine
NODE_ENV=development
BASE_URL=http://localhost:9090
```


### Commands to run Mongo container
```
docker network inspect event-net >/dev/null 2>&1 || docker network create event-net

echo "Removing container if running..."
docker rm -f mongo >/dev/null 2>&1

echo "Starting container..."
docker run -d \
--name mongo \
-p 27017:27017 \
-v /Users/vinod/code/mongo:/data/db \
--network loan \
mongo
```

# API Reference

## Create Event
- The events are created independently of the Tracking Plan.

### API Details
```
API : Create Loan

End point : /api/loan

Method : POST

Parameters :  
{
    "userId": "256",
    "amount": "10000",
    "tenure": "3"
}

Response : 
{
    "message": "Successful",
    "data": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c"
}

---------------------------------------------------------

API : Get All Loans

End Point : /api/loan

Method : GET

Response :
{
    "message": "Successful",
    "data": [
        {
            "amount": "10000",
            "createdAt": "2023-07-06T06:15:28.477Z",
            "status": "APPROVED",
            "tenure": "3",
            "updatedAt": "2023-07-06T06:22:05.702Z",
            "userId": "256",
            "id": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c"
        }
    ]
}

------------------------------------------------------------------------

API : Get User Loan By Id

End Point : api/loan/:userId/:loanId

Method : GET

Response :
{
    "message": "Sucessful",
    "data": {
        "amount": "10000",
        "createdAt": "2023-07-06T06:15:28.477Z",
        "status": "PAID",
        "tenure": "3",
        "updatedAt": "2023-07-06T07:16:35.122Z",
        "userId": "256",
        "id": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c"
    }
}

-------------------------------------------------------------------------

API : Update Loan

End point : /api/loan

Method : PATCH

Parameters :  
{
    "amount": "10000",
    "status": "APPROVED",
    "tenure": "3",
    "userId": "256",
    "id": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c"
}

Response : 
{
    "message": "Successful",
    "data": {
        "amount": "10000",
        "createdAt": "2023-07-06T06:15:28.477Z",
        "status": "APPROVED",
        "tenure": "3",
        "updatedAt": "2023-07-06T06:22:00.602Z",
        "userId": "256",
        "id": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c"
    }
}
```

## Create Repayment
- The Loan Id is to be provided in the Repayment.

### API Details
```
API : Get All Repayments

End point : /api/repayment

Method : GET

{
    "message": "Successful",
    "data": [
        {
            "amount": "3333.3333333333335",
            "createdAt": "2023-07-06T06:15:28.525Z",
            "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
            "scheduledPaymentDate": 1689228928525,
            "status": "PAID",
            "updatedAt": "2023-07-06T07:08:09.957Z",
            "userId": "256",
            "id": "93c30685-fc0e-486c-803c-e4d8f47285ac"
        },
        {
            "amount": "3333.3333333333335",
            "createdAt": "2023-07-06T06:15:28.558Z",
            "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
            "scheduledPaymentDate": 1689833728558,
            "status": "PAID",
            "updatedAt": "2023-07-06T07:16:03.838Z",
            "userId": "256",
            "id": "bd761131-c939-40c6-9c00-06162fc4ead8"
        },
        {
            "amount": "3333.3333333333335",
            "createdAt": "2023-07-06T06:15:28.563Z",
            "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
            "scheduledPaymentDate": 1690438528563,
            "status": "PAID",
            "updatedAt": "2023-07-06T07:16:35.117Z",
            "userId": "256",
            "id": "23ff8d22-00dd-4988-9a36-6b201e518e9e"
        }
    ]
}

----------------------------------------------------------

API : Get Loan Repayments

End point : /api/repayment/:loanId/getLoanRepayments

Method : GET

Response : 
{
    "message": "Successful",
    "data": [
        {
            "amount": "3333.3333333333335",
            "createdAt": "2023-07-06T06:15:28.525Z",
            "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
            "scheduledPaymentDate": 1689228928525,
            "status": "PENDING",
            "updatedAt": "2023-07-06T06:15:28.525Z",
            "userId": "256",
            "id": "93c30685-fc0e-486c-803c-e4d8f47285ac"
        },
        {
            "amount": "3333.3333333333335",
            "createdAt": "2023-07-06T06:15:28.558Z",
            "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
            "scheduledPaymentDate": 1689833728558,
            "status": "PENDING",
            "updatedAt": "2023-07-06T06:15:28.558Z",
            "userId": "256",
            "id": "bd761131-c939-40c6-9c00-06162fc4ead8"
        },
        {
            "amount": "3333.3333333333335",
            "createdAt": "2023-07-06T06:15:28.563Z",
            "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
            "scheduledPaymentDate": 1690438528563,
            "status": "PENDING",
            "updatedAt": "2023-07-06T06:15:28.563Z",
            "userId": "256",
            "id": "23ff8d22-00dd-4988-9a36-6b201e518e9e"
        }
    ]
}

---------------------------------------------------------------

API : Repayment Pay

End point : /api/repayment/repay

Method : POST

Parameters :  
{
    "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
    "amount": "4000",
    "userId": "256",
    "repaymentId": "23ff8d22-00dd-4988-9a36-6b201e518e9e"
}

Response : 
{
    "message": "Successful",
    "data": {
        "amount": "3333.3333333333335",
        "createdAt": "2023-07-06T06:15:28.563Z",
        "loanId": "1d26d206-7b4a-46fc-9f30-d5c2a54df83c",
        "scheduledPaymentDate": 1690438528563,
        "status": "PAID",
        "updatedAt": "2023-07-06T06:15:28.563Z",
        "userId": "256"
    }
}
```