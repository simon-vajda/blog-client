import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { API_URL, headers } from "../utils/ApiConfig";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function CommentEditor({ post, onSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      setContent("");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const path = "/comment";

    axios
      .post(
        API_URL + path,
        { content: content, postId: post.id },
        { headers: headers(currentUser) }
      )
      .then((response) => {
        setLoading(false);
        setContent("");
        onSuccess(response.data);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login", { state: { fromUrl: location.pathname } });
        }
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="comment"
        name="comment"
        label={currentUser ? "New comment" : "Log in to join the discussion"}
        required
        multiline
        maxRows={8}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!currentUser}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="end"
        sx={{ mt: 1 }}
      >
        <LoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          endIcon={<SendIcon />}
          loadingPosition="end"
          disabled={!content}
        >
          Post
        </LoadingButton>
      </Box>
    </Box>
  );
}
