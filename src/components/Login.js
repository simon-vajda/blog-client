import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { API_URL } from "../App";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(
    location.state != null && location.state.signupSuccess != null
  );

  // this page is only accessible if the user is not logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  function handleSnackbarClose(event, reason) {
    if (reason === "clickaway") return;
    setShowSuccess(false);
  }

  function onLogin(e) {
    e.preventDefault();

    setLoginError(false);

    axios
      .post(API_URL + "/auth/login", {
        email,
        password,
      })
      .then((response) => {
        setCurrentUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setLoginError(true);
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={onLogin} sx={{ mt: 3 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{ mb: 1 }}
            align="center"
            color="error.main"
            display={loginError ? "inherit" : "none"}
          >
            Wrong credentials
          </Typography>
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2" component={NavLink}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={showSuccess}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registration successful
        </Alert>
      </Snackbar>
    </Container>
  );
}
