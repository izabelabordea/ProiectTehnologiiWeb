import { EventTable } from "../models/Event";
import { UserTable, UserCreationAttributes } from "../models/User";

export async function createUser(user: UserCreationAttributes) {
    return await UserTable.create(user, {
        include: [{
            model: EventTable,
            as: 'events'
        }]
    });
}

export async function getAllUsers() {
    return await UserTable.findAll({
        include: [{
            model: EventTable,
            as: 'events'
        }]
    });
}

export async function getAllOrganizers() {
    return await UserTable.findAll({
        where: {
            isOrganizer: true
        },
        include: [{
            model: EventTable,
            as: 'events'
        }]
    });
}

export async function getUserById(id: number) {
    return await UserTable.findByPk(id, {
        include: [{
            model: EventTable,
            as: 'events'
        }]
    });
}

export async function getUserByCredentials(email: string, password: string) {
    return await UserTable.findOne({
        where: {
            email: email,
            password: password
        },
        include: [{
            model: EventTable,
            as: 'events'
        }]
    });
}

export async function updateUser(id: number, user: UserCreationAttributes) {
    return await UserTable.update(user, {
        where: {
            id: id
        }
    });
}

export async function deleteUser(id: number) {
    return await UserTable.destroy({
        where: {
            id: id
        }
    });
}