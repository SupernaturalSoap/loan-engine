import EventSvc from "../src/svc/event-svc";
import Event from "../src/models/event";

const eventSvc = new EventSvc();

const uuvidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;

let eventId: string = "";

const eventPayload: Event = {
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
};


describe('createEvent', () => {
    test('return an event Id', async () => {
        const id: any = await eventSvc.create(eventPayload);
        eventId = id;
        expect(id).toMatch(uuvidRegex);
    });
});

describe('getEventById', () => {
    test('return an event object', async () => {
        const event = await eventSvc.findById(eventId);
        expect(event).toMatchObject({
            name: expect.any(String),
            description: expect.any(String),
            rules: expect.any(Object)
        });
    });
});

