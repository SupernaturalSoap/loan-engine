import Event from '../../models/event';
import EventDao from '../event-dao';

import MongoDao from '../../utils/dao/mongo.dao';

export default class EventDaoMongo extends MongoDao<string, Event> implements EventDao {
    constructor() {
        super('events');
    }
}