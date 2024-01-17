import { useEffect, useState } from "react";
import { User } from "../models/User";
import { EventAttributes } from "../models/Event";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { createDate } from "../utils/createDate";
import { useNavigate } from "react-router-dom";
import { Attendee } from "../models/Attendee";

export default function Home({ user }: { user: User }) {
  const [events, setEvents] = useState<EventAttributes[]>([]);
  const [organizers, setOrganizers] = useState<User[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9000/api/event/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        const responce = await res.json();
        const eventObjects: EventAttributes[] = responce.value.map(
          (value: any) => ({
            id: value.id,
            title: value.title,
            description: value.description,
            state: value.state,
            startTime: createDate(value.startTime),
            endTime: createDate(value.endTime),
            code: value.code,
            organizerId: value.organizerId,
          })
        );

        setEvents(eventObjects);
      }
    });

    fetch("http://localhost:9000/api/user/organizer/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        const organizers = await res.json();
        setOrganizers(organizers.value);
      }
    });

    if (user.isOrganizer === false) {
      fetch("http://localhost:9000/api/attendee/user/" + user.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          const attendees = await res.json();
          setAttendees(attendees.value);
        }
      });
    }
  }, []);

  const attendHandler = (event: EventAttributes) => {
    fetch("http://localhost:9000/api/attendee/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: event.id,
        userId: user.id,
      }),
    }).then(async (res) => {
      if (res.ok) {
        const responce = await res.json();
        const attendee: Attendee = responce.value;
        setAttendees([...attendees, attendee]);
      }
    });
  };

  console.log(attendees);

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 8, gap: 4, display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h4">
        Welcome, {user.firstName + " " + user.lastName}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        <Typography variant="h5">Events</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/event/add")}
        >
          {" "}
          Add Event{" "}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Starting date</TableCell>
              <TableCell align="right">Ending date</TableCell>
              <TableCell align="right">Organizer</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event: EventAttributes, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
              >
                <TableCell component="th" scope="row">
                  {event.title}
                </TableCell>
                <TableCell align="right">{event.description}</TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    sx={{
                      color: event.state === "OPEN" ? "green" : "red",
                    }}
                  >
                    {event.state}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {event.startTime.toLocaleDateString() +
                    " " +
                    event.startTime.toLocaleTimeString()}
                </TableCell>
                <TableCell align="right">
                  {event.endTime.toLocaleDateString() +
                    " " +
                    event.endTime.toLocaleTimeString()}
                </TableCell>
                <TableCell align="right">
                  {
                    organizers.find(
                      (organizer) => organizer.id === event.organizerId
                    )?.firstName
                  }
                </TableCell>
                <TableCell align="right">
                  {user.isOrganizer ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      View Attendees
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => attendHandler(event)}
                      disabled={
                        attendees.find(
                          (attendee) => attendee.eventId === event.id
                        ) !== undefined
                      }
                    >
                      Attend
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
