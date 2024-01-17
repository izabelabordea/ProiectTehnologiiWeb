import {
  Box,
  Button,
  Container,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { User } from "../models/User";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEventPage({ user }: { user: User }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const event = {
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      organizerId: user.id,
    };
    fetch("http://localhost:9000/api/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }).then(async (res) => {
      if (res.ok) {
        const responce = await res.json();
        navigate("/");
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          justifyContent: "center",
        }}
        component={"form"}
        onSubmit={submitHandler}
      >
        <Typography variant="h4">Add Event</Typography>
        <TextField
          label="Event Name"
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          label="Event Description"
          variant="outlined"
          multiline
          rows={4}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Time"
            value={startTime}
            onChange={(date) => {
              setStartTime(date);
            }}
          />
          <DateTimePicker
            label="End Time"
            value={endTime}
            onChange={(date) => {
              setEndTime(date);
            }}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" type="submit">
          Add Event
        </Button>
      </Box>
    </Container>
  );
}
