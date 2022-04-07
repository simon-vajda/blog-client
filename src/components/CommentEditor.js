import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";

export default function CommentEditor() {
  const [content, setContent] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      setContent("");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {};

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
