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
APP_NAME=event-engine
APP_PORT=9090
APP_LOGGER_DIR=.
APP_LOGGER_LEVEL=debug
APP_MONGO_URL=mongodb://localhost/event-engine
APP_MONGO_DB_NAME=event-engine
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
--network event \
mongo
```

# API Reference

## Create Event
- The events are created independently of the Tracking Plan.

### API Details
```
API : Create Event

End point : /api/event

Method : POST

Parameters :  
{
    "name": "Order Viewed",
    "description": "Whose order viewed",
    "rules": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
            "type": "object",
            "properties": {
                "product": {
                "type": ["string"]
                },
                "price": {
                "type": ["number"]
                },
                "category": {
                "type": ["string"]
                },
                "currency": {
                "type": ["string"]
                }
            }, 
            "required": [
            "product",
            "price",
            "category",
            "currency"
            ]
        }
    }
}

Response : 
{
    "message": "Successful",
    "data": "0a0ce469-4cea-465c-96a4-63b13257089c"
}

---------------------------------------------------------

API : Get All Events

End Point : /api/event

Method : GET

Response :
{
    "message": "Successful",
    "data": [
        {
            "createdAt": "2023-03-13T13:32:24.394Z",
            "description": "Whose order viewed",
            "name": "Order Viewed",
            "rules": {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "object",
                "properties": {
                    "type": "object",
                    "properties": {
                        "product": {
                            "type": [
                                "string"
                            ]
                        },
                        "price": {
                            "type": [
                                "number"
                            ]
                        },
                        "currency": {
                            "type": [
                                "string"
                            ]
                        }
                    },
                    "required": [
                        "product",
                        "price",
                        "currency"
                    ]
                }
            },
            "updatedAt": "2023-03-13T13:32:24.394Z",
            "id": "4880604d-b058-484a-870f-43cbbf18734c"
        },
        {
            "createdAt": "2023-03-13T13:39:32.928Z",
            "description": "Whose order viewed",
            "name": "Order Viewed Two",
            "rules": {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "object",
                "properties": {
                    "type": "object",
                    "properties": {
                        "product": {
                            "type": [
                                "string"
                            ]
                        },
                        "price": {
                            "type": [
                                "number"
                            ]
                        },
                        "category": {
                            "type": [
                                "string"
                            ]
                        },
                        "currency": {
                            "type": [
                                "string"
                            ]
                        }
                    },
                    "required": [
                        "product",
                        "price",
                        "category",
                        "currency"
                    ]
                }
            },
            "updatedAt": "2023-03-13T13:57:36.350Z",
            "id": "0a0ce469-4cea-465c-96a4-63b13257089c"
        },
    ]
}

------------------------------------------------------------------------

API : Get Event By Id

End Point : /api/event/4880604d-b058-484a-870f-43cbbf18734c

Method : GET

Response :
{
    "message": "Sucessful",
    "data": {
        "createdAt": "2023-03-13T13:32:24.394Z",
        "description": "Whose order viewed",
        "name": "Order Viewed",
        "rules": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "properties": {
                "type": "object",
                "properties": {
                    "product": {
                        "type": [
                            "string"
                        ]
                    },
                    "price": {
                        "type": [
                            "number"
                        ]
                    },
                    "currency": {
                        "type": [
                            "string"
                        ]
                    }
                },
                "required": [
                    "product",
                    "price",
                    "currency"
                ]
            }
        },
        "updatedAt": "2023-03-13T13:32:24.394Z",
        "id": "4880604d-b058-484a-870f-43cbbf18734c"
    }
}
```

## Create Tracking Plan
- The required Event Ids are provided to be included in the Tracking Plan.

### API Details
```
API : Create Tracking Plan

End point : /api/trackingPlan

Method : POST

Parameters :
{
    "display_name": "Tracking Plan",
    "description": "This Is Tracking Plan One",
    "events": [ "4880604d-b058-484a-870f-43cbbf18734c", "0a0ce469-4cea-465c-96a4-63b13257089c" ]
}

Response :
{
    "message": "Successful",
    "data": "b097c00c-8e2e-4eeb-8b6a-2d5beb0568a0"
}

-------------------------------------------------------

API : Get all Tracking Plan

End point : /api/trackingPlan

Method : GET

Response :
{
    "message": "Successful",
    "data": [
        {
            "createdAt": "2023-03-13T13:41:28.788Z",
            "description": "This Is First Tracking Plan",
            "display_name": "Tracking Plan",
            "events": [
                "4880604d-b058-484a-870f-43cbbf18734c",
                "0a0ce469-4cea-465c-96a4-63b13257089c"
            ],
            "updatedAt": "2023-03-13T14:02:29.069Z",
            "id": "b097c00c-8e2e-4eeb-8b6a-2d5beb0568a0"
        },
        {
            "createdAt": "2023-03-14T13:53:45.083Z",
            "description": "This Is Tracking Plan One",
            "display_name": "Tracking Plan",
            "events": [
                "4880604d-b058-484a-870f-43cbbf18734c",
                "0a0ce469-4cea-465c-96a4-63b13257089c"
            ],
            "updatedAt": "2023-03-14T13:53:45.083Z",
            "id": "5640f8ac-b0a8-4f1a-bd6d-04498ccf7f52"
        },
        {
            "createdAt": "2023-03-14T13:54:33.879Z",
            "description": "This Is Tracking Plan One",
            "display_name": "Tracking Plan",
            "events": [
                "4880604d-b058-484a-870f-43cbbf18734c",
                "0a0ce469-4cea-465c-96a4-63b13257089c"
            ],
            "updatedAt": "2023-03-14T13:54:33.879Z",
            "id": "6e8cda9e-c102-464b-9cb4-b6d0993d1d18"
        }
    ]
}

----------------------------------------------------------

API : Get Tracking Plan By Id

End point : /api/trackingPlan/b097c00c-8e2e-4eeb-8b6a-2d5beb0568a0

Method : GET

Response : 
{
    "message": "Sucessful",
    "data": {
        "createdAt": "2023-03-13T13:41:28.788Z",
        "description": "This Is First Tracking Plan",
        "display_name": "Tracking Plan",
        "events": [
            {
                "createdAt": "2023-03-13T13:32:24.394Z",
                "description": "Whose order viewed",
                "name": "Order Viewed",
                "rules": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "properties": {
                        "type": "object",
                        "properties": {
                            "product": {
                                "type": [
                                    "string"
                                ]
                            },
                            "price": {
                                "type": [
                                    "number"
                                ]
                            },
                            "currency": {
                                "type": [
                                    "string"
                                ]
                            }
                        },
                        "required": [
                            "product",
                            "price",
                            "currency"
                        ]
                    }
                },
                "updatedAt": "2023-03-13T13:32:24.394Z",
                "id": "4880604d-b058-484a-870f-43cbbf18734c"
            },
            {
                "createdAt": "2023-03-13T13:39:32.928Z",
                "description": "Whose order viewed",
                "name": "Order Viewed Two",
                "rules": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "properties": {
                        "type": "object",
                        "properties": {
                            "product": {
                                "type": [
                                    "string"
                                ]
                            },
                            "price": {
                                "type": [
                                    "number"
                                ]
                            },
                            "category": {
                                "type": [
                                    "string"
                                ]
                            },
                            "currency": {
                                "type": [
                                    "string"
                                ]
                            }
                        },
                        "required": [
                            "product",
                            "price",
                            "category",
                            "currency"
                        ]
                    }
                },
                "updatedAt": "2023-03-13T13:57:36.350Z",
                "id": "0a0ce469-4cea-465c-96a4-63b13257089c"
            }
        ],
        "updatedAt": "2023-03-13T14:02:29.069Z",
        "id": "b097c00c-8e2e-4eeb-8b6a-2d5beb0568a0"
    }
}
```