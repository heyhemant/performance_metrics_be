const PerformanceEvent = require('../models/performance_event_model');
const { Op } = require('sequelize');

// Handler function for getting all events
async function getEvent(req, res) {
    const trackerName = req.json.tracker;
    const range = req.json.range;
    const appVersions = req.json.app_version;
    const toDate = new Date();
    var fromDate = new Date();
    switch (range) {
        case '1d':
            fromDate.setDate(fromDate.getDate() - 1);
            break;
        case '7d':
            fromDate.setDate(fromDate.getDate() - 7);
            break;
        case '15d':
            fromDate.setDate(fromDate.getDate() - 15);
            break;
        case '30d':
            fromDate.setDate(fromDate.getDate() - 30);
            break;
        default:
            fromDate.setDate(fromDate.getDate() - 7);
            break;
    }
    var response = {};
    for (let i = 0; i < appVersions.length; i++) {
        const events = await PerformanceEvent.findAll({
            where: {
                tracker: trackerName,
                date: {
                    [Op.between]: [fromDate, toDate]
                },
                app_version: appVersions
            }
        });
        response[appVersions[i]] = events;
    }
    return res.json(response);
}

// Handler function for creating a new event
async function createEvents(req, res) {
    await PerformanceEvent.sync({force: true});
    const events = req.body;
    console.log(events);
    try {
        await PerformanceEvent.bulkCreate(events).then(() => {
            res.json({ "message": "Events created successfully" });
        });
    }
    catch (err) {
        console.log(err);
        res.json({ "message": "Error creating events" });
    }
    return res;
}

module.exports = {
    getEvent,
    createEvents,
};
