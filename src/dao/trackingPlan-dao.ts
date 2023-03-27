import TrackingPlan from "../models/trackingPlan";
import Dao from "../utils/dao/dao";

export default interface TrackingPlanDao extends Dao<string, TrackingPlan> {}