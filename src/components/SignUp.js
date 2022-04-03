import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Avatar,
  Link,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../ApiConfig";
import { UserContext } from "../UserContext";
import { LoadingButton } from "@mui/lab";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // this page is only accessible if the user is not logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  async function onSignUp(e) {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    axios
      .post(API_URL + "/auth/signup", {
        name,
        email,
        password,
      })
      .then((response) => {
        setLoading(false);
        navigate("/login", { state: { signupSuccess: true } });
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) {
          const data = error.response.data;
          data.errors.forEach((formError) => {
            switch (formError.field) {
              case "name":
                setNameError(formError.message);
                break;
              case "email":
                setEmailError(formError.message);
                break;
              case "password":
                setPasswordError(formError.message);
                break;
              default:
            }
          });
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={onSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                helperText={nameError}
                error={nameError !== ""}
              />
            </Grid>
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
                helperText={emailError}
                error={emailError !== ""}
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
                helperText={passwordError}
                error={passwordError !== ""}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            loading={loading}
            fullWidth
            variant="contained"
            endIcon={<PersonAddIcon />}
            loadingPosition="end"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" component={NavLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
