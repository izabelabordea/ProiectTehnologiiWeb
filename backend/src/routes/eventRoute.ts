import express from 'express';
import { EventCreationAttributes } from '../db/models/Event';
import { createEvent, getAllEvents, getEventById, updateEventState, updateEvent, deleteEvent } from '../db/dataAccess/EventDA';
import { convertStringToDate } from '../utils/dateUtils';

function CreateCode(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var index = 0; index < length; index++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const router = express.Router();

router.route('/').post(async (req, res) => {
    try {
        const body = req.body;
        const startTime = convertStringToDate(body.startTime);
        const endTime = convertStringToDate(body.endTime);
        if (startTime > endTime) {
            return res.status(400).json({ message: 'Start time cannot be after end time' });
        }
        const attributes: EventCreationAttributes = {
            title: body.title,
            description: body.description,
            startTime: startTime,
            endTime: endTime,
            code: CreateCode(6),
            organizerId: body.organizerId
        };
        const event = await createEvent(attributes);
        if (event) {
            return res.status(200).json({ message: 'Event created!', value: event });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/all').get(async (req, res) => {
    try {
        const events = await getAllEvents();
        if (events) {
            return res.status(200).json({ message: 'Found ' + events.length + ' events', value: events });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;