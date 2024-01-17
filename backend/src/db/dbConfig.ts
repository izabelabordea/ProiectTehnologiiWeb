import { Sequelize } from "sequelize";
import env from 'dotenv';

env.config();

const db = new Sequelize({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql'
});

export default db;