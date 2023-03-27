import TrackingPlanSvc from "../src/svc/trackingPlan-svc";
import TrackingPlan from "../src/models/trackingPlan";

const trackingPlanSvc: TrackingPlanSvc = new TrackingPlanSvc();

let trackingPlanId: string = "";

const uuvidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;

const trackingPlanPalyload: TrackingPlan = {
    "display_name": "Tracking Plan",
    "description": "This Is Tracking Plan One",
    "events": [ "4880604d-b058-484a-870f-43cbbf18734c", "0a0ce469-4cea-465c-96a4-63b13257089c" ]
}


describe('createTrackingPlan', () => {
    test('return a tracking plan Id', async () => {
        const id: any = await trackingPlanSvc.create(trackingPlanPalyload);
        trackingPlanId = id;
        expect(id).toMatch(uuvidRegex);
    });
});

describe('getTrackingPlan', () => {
    test('return a tracking plan Object', async () => {
        const trackingPlan = await trackingPlanSvc.findById(trackingPlanId);
        expect(trackingPlan).toMatchObject({
            description: expect.any(String),
            display_name: expect.any(String),
            events: expect.any(Object)
        });
    });
});
