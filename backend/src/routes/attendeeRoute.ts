import express from "express";
import {
  createAttendee,
  getAllAttendees,
  getAttendeesByEventId,
  getAttendeesByUserId,
} from "../db/dataAccess/AttendeesDA";
import { AttendeeCreationAttributes } from "../db/models/Attendees";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const body = req.body;
    const attributes: AttendeeCreationAttributes = {
      userId: body.userId,
      eventId: body.eventId,
    };
    const attendee = await createAttendee(attributes);
    if (attendee) {
      return res
        .status(200)
        .json({ message: "Attendee created!", value: attendee });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/all").get(async (req, res) => {
  try {
    const attendees = await getAllAttendees();
    if (attendees) {
      return res.status(200).json({
        message: "Found " + attendees.length + " attendees",
        value: attendees,
      });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/event/:eventId").get(async (req, res) => {
  try {
    const eventId = parseInt(req.params.eventId);
    const attendees = await getAttendeesByEventId(eventId);
    if (attendees) {
      return res.status(200).json({
        message: "Found " + attendees.length + " attendees",
        value: attendees,
      });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/user/:userId").get(async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const attendees = await getAttendeesByUserId(userId);
    if (attendees) {
      return res.status(200).json({
        message: "Found " + attendees.length + " attendees",
        value: attendees,
      });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
