import { ModelDefined, DataTypes } from "sequelize";
import db from "../dbConfig";

export interface User {
    id: number;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    isOrganizer: boolean;
}

export interface UserCreationAttributes {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    isOrganizer: boolean;
}

export const UserTable : ModelDefined<User, UserCreationAttributes> = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isOrganizer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});