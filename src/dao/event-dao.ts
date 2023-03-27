import Event from "../models/event";
import Dao from "../utils/dao/dao";

export default interface EventDao extends Dao<string, Event> {}