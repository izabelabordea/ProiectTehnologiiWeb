import { useState } from "react";
import { User } from "../models/User";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Login({ setUser }: { setUser: (user: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:9000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(async (res) => {
        if (res.status !== 200) {
          setError(true);
          return;
        }
        if (res.ok) {
          const user = await res.json();
          setUser(user.value);
        }
      }).catch((err) => {
        setError(true);
      });
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Login</Typography>
        {error && <Alert severity="error">Invalid email or password</Alert>}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link to="/register">Register</Link>
      </Box>
    </Container>
  );
}
