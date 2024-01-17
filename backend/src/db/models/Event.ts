import { DataTypes, ModelDefined } from 'sequelize';
import db from '../dbConfig';

export interface Event {
    id: number;
    title: string;
    description?: string;
    state: 'OPEN' | 'CLOSED';
    code: string;
    startTime: Date;
    endTime: Date;
    organizerId: number;
}

export interface EventCreationAttributes {
    title: string;
    description?: string;
    code: string;
    startTime: Date;
    endTime: Date;
    organizerId: number;
}

export const EventTable : ModelDefined<Event, EventCreationAttributes> = db.define('event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.ENUM('OPEN', 'CLOSED'),
        allowNull: false,
        defaultValue: 'CLOSED'
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});