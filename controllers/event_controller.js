const PerformanceEvent = require('../models/performance_event_model');
const { Op } = require('sequelize');

// Handler function for getting all events
async function getEvent(req, res) {
    console.log(req.body);
    const trackerName = req.body.tracker;
    const range = req.body.range;
    const appVersions = req.body.app_version;
    const toDate = new Date();
    var fromDate = new Date();
    if (!appVersions || !trackerName || !range) {
        return res.json({ "message": "Missing Data" });
    }
    try {
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
    catch (err) {
        console.log(err);
        return res.json({ "message": "Error getting events" });
    }
}

// Handler function for creating a new event
async function createEvents(req, res) {
    await PerformanceEvent.sync();
    const events = req.body;
    if (!events) {
        return res.json({ "message": "Missing Data" });
    }
    console.log(req);
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
