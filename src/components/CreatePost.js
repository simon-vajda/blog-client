import { Container, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, headers } from "../ApiConfig";
import { UserContext } from "../UserContext";
import { LoadingButton } from "@mui/lab";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { state: { fromUrl: "/create" } });
    }
  }, [currentUser, navigate]);

  function onPost(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        API_URL + "/post",
        { title, content },
        { headers: headers(currentUser) }
      )
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login", { state: { fromUrl: "/create" } });
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

        <LoadingButton
          type="submit"
          loading={loading}
          fullWidth
          variant="contained"
          endIcon={<SendIcon />}
          loadingPosition="end"
        >
          Post
        </LoadingButton>
      </Stack>
    </Container>
  );
}
