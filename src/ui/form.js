let eventCount = 1;
function addEvent() {
    eventCount++;
    const formsContainer = document.getElementById("form-container");
    const event = document.createElement("div");
    event.className = `event`;
    event.innerHTML = `<h1>Event${eventCount}</h1>
        <label for="ev${eventCount}-name">Name</label>
        <input type="text" name="ev${eventCount}-name"/><br>

        <label for="ev${eventCount}-description">Description</label>
        <input type="text" name="ev${eventCount}-description"/><br><br>

        <label for="rules">Rules</label>
        <input style="height:200px;font-size:14pt;" type="text" name="ev${eventCount}-rules"/>`;
    formsContainer.appendChild(event);
}

async function submitTrackingPlan() {
    try {
        let trackingPlan = {};
        let tpEvents = [];
        let event = {};
        const form = document.getElementById("form");
        const formData = new FormData(form);
        for (const [name, value] of formData.entries()) {
            switch (name) {
                case "tp-name" :
                    trackingPlan.display_name = value;
                case "tp-description" :
                    trackingPlan.description = value;
                default :
                    if(name.startsWith("ev")) {
                        let attr = name.split("-")[1];
                        if(attr == "rules") {
                            event.rules = JSON.parse(value);
                            tpEvents.push(event);
                            event = {};
                        } else if(attr == "name"){
                            event.name = value;
                        } else if(attr == "description"){
                            event.description = value;
                        }
                    }
            }
        }
        let eventList = await this.postEvents(tpEvents);
        trackingPlan.events = eventList;
        let tp = await this.postTrackingPlan(trackingPlan);
        console.log(tp);

    } catch (err) {
        console.log(err);
    }
}

async function postEvents(events) {
    try {
        const promisesArray = events.map(async (event) => {
            const response = await fetch(`${process.env.BASE_URL}/api/event`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: { 'Content-Type': 'application/json' }
            });
            return response.json();
        });
        let responsesArray = await Promise.all(promisesArray);
        responsesArray = responsesArray.map((response) =>{
            return response.data;
        });
        return responsesArray;
    } catch (err) {
        console.log(err);
    }
}

async function postTrackingPlan(trackingPlan) {
    try {
        const response = fetch(`${process.env.BASE_URL}/api/event`, {
            method: "POST",
            body: JSON.stringify(trackingPlan),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response;
        return data.json();
    } catch (err) {
        console.log(err);
    }
}