const express = require('express');
const eventRouter = express.Router();
const {getEvent, createEvents} = require('../controllers/event_controller');

// GET route to retrieve all events
eventRouter.get('/', getEvent);

// POST route to create a new event
eventRouter.post('/', createEvents);

module.exports = eventRouter;
