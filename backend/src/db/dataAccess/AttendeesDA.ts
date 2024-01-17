import { AttendeeCreationAttributes, AttendeeTable } from "../models/Attendees";

export async function createAttendee(attendee: AttendeeCreationAttributes) {
    return await AttendeeTable.create(attendee);
}

export async function getAllAttendees() {
    return await AttendeeTable.findAll();
}

export async function getAttendeeById(id: number) {
    return await AttendeeTable.findByPk(id);
}

export async function getAttendeesByEventId(eventId: number) {
    return await AttendeeTable.findAll({
        where: {
            eventId: eventId
        }
    });
}

export async function getAttendeesByUserId(userId: number) {
    return await AttendeeTable.findAll({
        where: {
            userId: userId
        }
    });
}