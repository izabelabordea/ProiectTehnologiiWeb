import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { db_init } from './db';
import masterRoute from './routes/masterRoute';
import userRouter from './routes/userRoute';
import eventRouter from './routes/eventRoute';
import attendeeRouter from './routes/attendeeRoute';
import { getAllEvents, updateEventState } from './db/dataAccess/EventDA';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));

db_init();

app.use('/api', masterRoute);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/attendee', attendeeRouter);


const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

try{
setInterval(async () => {
    const events = await getAllEvents();
    const now = new Date();
    const currentEvents = events.filter((event) => {
        return event.dataValues.startTime <= now && event.dataValues.endTime >= now;
    });
    currentEvents.forEach((event) => {
        updateEventState(event.dataValues.id, 'OPEN');
    });
    const pastEvents = events.filter((event) => {
        return event.dataValues.endTime < now;
    });
    pastEvents.forEach((event) => {
        updateEventState(event.dataValues.id, 'CLOSED');
    });
}, 5000);
} catch(e) {

}