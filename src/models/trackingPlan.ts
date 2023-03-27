import event from './event';

export default interface trackingPlan {
    display_name: string,
    description?: string,
    events: string[],
    createdAt?: string,
    updatedAt?: string
}