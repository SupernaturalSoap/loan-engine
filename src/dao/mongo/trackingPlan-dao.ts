import TrackingPlan from "../../models/trackingPlan";
import TrackingPlanDao from "../trackingPlan-dao";

import MongoDao from "../../utils/dao/mongo.dao";

export default class TrackingPlanDaoMongo extends MongoDao<string, TrackingPlan> implements TrackingPlanDao {
    constructor() {
        super('tracking-plans');
    }
}