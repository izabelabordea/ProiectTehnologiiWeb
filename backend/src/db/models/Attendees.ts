import { ModelDefined, DataTypes } from "sequelize";
import db from "../dbConfig";

export interface Attendee {
    id: number;
    eventId: number;
    userId: number;
}

export interface AttendeeCreationAttributes {
    eventId: number;
    userId: number;
}

export const AttendeeTable : ModelDefined<Attendee, AttendeeCreationAttributes> = db.define('attendee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});