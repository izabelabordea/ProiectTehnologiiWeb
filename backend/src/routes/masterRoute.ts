import express from 'express';
import db from '../db/dbConfig';

const router = express.Router();

router.route('/create').get((req, res) => {
    try {
        db.sync({ force: true }).then(() => {
            console.log('Database & tables created!');
            return res.status(200).json({ message: 'Database & tables created!' });
        }).catch((err) => {
            console.log(err.stack);
            return res.status(500).json({ message: 'Internal Server Error' });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;