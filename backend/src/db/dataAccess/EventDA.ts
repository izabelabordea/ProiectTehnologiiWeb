import { EventTable, EventCreationAttributes } from "../models/Event";
import { AttendeeTable } from "../models/Attendees";

export async function createEvent(event: EventCreationAttributes) {
    return await EventTable.create(event, {
        include: [{
            model: AttendeeTable,
            as: 'attendees'
        }]
    });
}

export async function getAllEvents() {
    return await EventTable.findAll({
        include: [{
            model: AttendeeTable,
            as: 'attendees'
        }]
    });
}

export async function getEventById(id: number) {
    return await EventTable.findByPk(id, {
        include: [{
            model: AttendeeTable,
            as: 'attendees'
        }]
    });
}

export async function updateEventState(id: number, state: 'OPEN' | 'CLOSED') {
    return await EventTable.update({
        state: state
    }, {
        where: {
            id: id
        }
    });
}

export async function updateEvent(id: number, event: EventCreationAttributes) {
    return await EventTable.update(event, {
        where: {
            id: id
        }
    });
}

export async function deleteEvent(id: number) {
    return await EventTable.destroy({
        where: {
            id: id
        }
    });
}