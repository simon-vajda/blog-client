import { Container, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL, headers } from "../utils/ApiConfig";
import { UserContext } from "../utils/UserContext";
import { LoadingButton } from "@mui/lab";
import { hasEditPermission } from "../components/Post";

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { state: { fromUrl: location.pathname } });
    }
  }, [currentUser]);

  useEffect(() => {
    if (id === undefined) return;

    setLoading(true);
    axios
      .get(API_URL + `/post/${id}`, { headers: headers(currentUser) })
      .then((response) => {
        setLoading(false);
        setTitle(response.data.title);
        setContent(response.data.content);

        if (!hasEditPermission(currentUser, response.data)) {
          navigate(`/post/${id}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login", { state: { fromUrl: location.pathname } });
        } else if ((error.response.status = 403)) {
          navigate("/");
        } else if (error.response.status === 404) {
          navigate("/");
        }
      });
  }, []);

  function onPost(e) {
    e.preventDefault();
    setLoading(true);

    const path = id ? `/post/${id}` : "/post";
    const method = id ? "put" : "post";
    const successUrl = id ? `/post/${id}` : "/";

    axios
      .request({
        method: method,
        baseURL: API_URL,
        url: path,
        data: { title, content },
        headers: headers(currentUser),
      })
      .then(() => {
        setLoading(false);
        navigate(successUrl);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login", { state: { fromUrl: location.pathname } });
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
          {id ? "Update" : "Post"}
        </LoadingButton>
      </Stack>
    </Container>
  );
}
