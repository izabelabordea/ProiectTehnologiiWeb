import mysql from 'mysql2/promise';
import env from 'dotenv';
import sequelize from 'sequelize';
import { UserTable } from './models/User';
import { EventTable } from './models/Event';
import db from './dbConfig';
import { AttendeeTable } from './models/Attendees';

env.config();

async function createDB() {
    await mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }).then((connection) => {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
    }).catch((err) => {
        console.log(err.stack);
    });
}

function connectDB() {
    db.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
}

function fkConfig() {
    UserTable.hasMany(EventTable, {
        as: 'events',
        foreignKey: 'organizerId'
    });

    EventTable.belongsTo(UserTable, {
        as: 'organizer',
        foreignKey: 'organizerId'
    });

    EventTable.hasMany(AttendeeTable, {
        as: 'attendees',
        foreignKey: 'eventId'
    });

    AttendeeTable.belongsTo(EventTable, {
        as: 'event',
        foreignKey: 'eventId'
    });
}

export async function db_init() {
    await createDB();
    connectDB();
    fkConfig();
}