import { Button, Container, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, headers } from "../ApiConfig";
import { UserContext } from "../UserContext";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  function onPost(e) {
    e.preventDefault();

    axios
      .post(
        API_URL + "/post",
        { title, content },
        { headers: headers(currentUser.token) }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login");
        }
      });
  }

  return (
    <Container component="main">
      <Stack spacing={2} sx={{ mt: 3 }} component="form" onSubmit={onPost}>
        <TextField
          id="title"
          name="title"
          label="Title"
          required
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="content"
          name="content"
          label="Content"
          required
          multiline
          minRows={4}
          maxRows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </Stack>
    </Container>
  );
}
