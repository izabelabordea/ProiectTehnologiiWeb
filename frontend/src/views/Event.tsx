import { useParams } from "react-router-dom";
import { User } from "../models/User";
import { Box, Button, Container, Typography } from "@mui/material";
import { Attendee } from "../models/Attendee";
import { useEffect, useState } from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export default function EventPage({ user }: { user: User }) {
  const { id } = useParams<{ id: string }>();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        const users = await res.json();
        setUsers(users.value);
      }
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9000/api/attendee/event/" + id, {
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
  }, [id]);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const handleExport = async () => {

    const excelData = attendees.map((attendee: Attendee) => {
      const user = users.find((user) => user.id === attendee.userId);
      return {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      };
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, "attendees" + fileExtension);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 8, gap: 4, display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        <Typography variant="h4">Attendees for Event {id}</Typography>
        <Button variant="contained" onClick={handleExport}>
          Export
        </Button>
      </Box>
      {attendees.map((attendee) => {
        const user = users.find((user) => user.id === attendee.userId);
        return (
          <Typography key={attendee.id} variant="h6">
            {user?.firstName} {user?.lastName}
          </Typography>
        );
      })}
    </Container>
  );
}
