import express from 'express';
import { UserCreationAttributes } from '../db/models/User';
import { createUser, getAllOrganizers, getAllUsers, getUserByCredentials } from '../db/dataAccess/UserDA';

const router = express.Router();

router.route('/create').post(async (req, res) => {
    try {
        const body = req.body;
        const attributes: UserCreationAttributes = {
            password: body.password,
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            isOrganizer: body.isOrganizer
        };
        const user = await createUser(attributes);
        if (user) {
            return res.status(200).json({ message: 'User created!', value: user });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/all').get(async (req, res) => {
    try {
        const users = await getAllUsers();
        if (users) {
            return res.status(200).json({ message: 'Found ' + users.length + ' users', value: users });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route("/organizer/all").get(async (req, res) => {
  try {
    const users = await getAllOrganizers();
    if (users) {
      return res
        .status(200)
        .json({ message: "Found " + users.length + " users", value: users });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.route('/login').post(async (req, res) => {
    try {
        const body = req.body;
        const user = await getUserByCredentials(body.email, body.password);
        if (user) {
            return res.status(200).json({ message: 'User logged in!', value: user });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;