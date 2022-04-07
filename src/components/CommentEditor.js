import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { API_URL, headers } from "../utils/ApiConfig";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function CommentEditor({
  post,
  comment,
  onSuccess,
  onCancel,
  sx,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const label = currentUser
    ? comment
      ? "Edit comment"
      : "New comment"
    : "Log in to join the discussion";

  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setContent("");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const path = comment ? `/comment/${comment.id}` : "/comment";
    const method = comment ? "put" : "post";

    axios
      .request({
        method: method,
        baseURL: API_URL,
        url: path,
        data: { content: content, postId: post.id },
        headers: headers(currentUser),
      })
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
    <Box component="form" onSubmit={handleSubmit} sx={sx}>
      <TextField
        id="comment"
        name="comment"
        label={label}
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
        {comment && (
          <Button sx={{ mr: 1 }} onClick={onCancel} variant="text">
            Cancel
          </Button>
        )}
        <LoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          endIcon={<SendIcon />}
          loadingPosition="end"
          disabled={!content}
        >
          {comment ? "Update" : "Post"}
        </LoadingButton>
      </Box>
    </Box>
  );
}
