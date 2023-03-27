import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/client/logger';

import Event from '../models/event';
import EventDaoMongo from '../dao/mongo/event-dao-mongo';

export default class EventSvc {
    private eventDao: EventDaoMongo;

    constructor() {
        this.eventDao = new EventDaoMongo();
    }

    async create(context: any) {
        const eventId = uuidv4();
        if(context.name == null || context.name == undefined || context.name == "") {
            throw new Error('INVALID_EVENT');
        }

        if(context.description == null || context.description == undefined || context.description == "") {
            throw new Error('INVALID_EVENT');
        }

        if(context.rules == null || context.rules == undefined) {
            throw new Error('INVALID_EVENT');
        }

        const Event: Event = {
            name: context.name,
            description: context.description,
            rules: context.rules
        }

        await this.eventDao.upsert(eventId, Event);
        logger.info(`Event created with ID ${eventId}`);

        return eventId;
    }

    async update(id: string, context: any) {
        const event: Event = await this.eventDao.findById(id);

        if(!event) {
            throw new Error('INVALID_EVENT_ID');
        }

        delete context.id;
        const update: any = context;

        await this.eventDao.upsert(id, { ...event, ...update });
        logger.info(`Event updated with name: ${event.name} and id: ${id}`);

        return event;
    }

    async findById(id: string) {
        return this.eventDao.findById(id);
    }

    async findAll(page: string, size: string) {
        const limit = parseInt(size);
        const skip = (parseInt(page) - 1) * limit;
        return this.eventDao.findAll(skip, limit);
    }
}