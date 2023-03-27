import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/client/logger';

import TrackingPlan from '../models/trackingPlan';
import TrackingPlanDaoMongo from '../dao/mongo/trackingPlan-dao';

import EventSvc from './event-svc';

export default class TrackingPlanSvc {
    private trackingPlanDao: TrackingPlanDaoMongo;
    private eventSvc: EventSvc;

    constructor() {
        this.trackingPlanDao = new TrackingPlanDaoMongo();
        this.eventSvc = new EventSvc();
    }

    async create(context: any) {
        const trackingPlanId = uuidv4();

        if(context.display_name == null || context.display_name == undefined || context.display_name == "") {
            throw new Error('INVALID_TRACKING_PLAN');
        }

        if(context.events == null || context.events == undefined) {
            throw new Error('INVALID_TRACKING_PLAN');
        }

        const TrackingPlan: TrackingPlan = {
            display_name: context.display_name,
            description: context.description,
            events: context.events
        }

        await this.trackingPlanDao.upsert(trackingPlanId, TrackingPlan);
        logger.info(`Tracking plan created with ID ${trackingPlanId}`);

        return trackingPlanId;
    }

    async update(id: string, context: any) {
        const trackingPlan: TrackingPlan = await this.trackingPlanDao.findById(id);

        if(!trackingPlan) {
            throw new Error('INVALID_TRACKING_PLAN_ID');
        }

        delete context.id;
        const update: any = context;

        await this.trackingPlanDao.upsert(id, { ...trackingPlan, ...update });
        logger.info(`Tracking plan updated with name: ${trackingPlan.display_name} and id: ${id}`);

        return trackingPlan;
    }

    async findById(id: string) {
        let trackingPlan = await this.trackingPlanDao.findById(id);
        const events: any = trackingPlan.events.map(async (event) => {
            console.log("Event Id : %o", event);
            return await this.eventSvc.findById(event);
        });
        trackingPlan.events = await Promise.all(events);
        return trackingPlan;
    }

    async findAll(page: string, size: string) {
        const limit = parseInt(size);
        const skip = (parseInt(page) - 1) * limit;
        return this.trackingPlanDao.findAll(skip, limit);
    }
}