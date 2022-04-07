import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import TimeAgo from "javascript-time-ago";

export default function Comment({ comment }) {
  const timeAgo = new TimeAgo("en-GB");

  return (
    <Stack direction="row">
      <AccountCircle fontSize="large" sx={{ color: grey[500], mr: 1 }} />
      <Stack>
        <Box>
          <Typography display="inline" fontWeight="bold">
            {comment.author.name}
          </Typography>
          <Typography display="inline" ml={1} color={grey[500]}>
            {"• " +
              timeAgo.format(new Date(comment.updatedOn)) +
              (comment.createdOn !== comment.updatedOn ? " (edited)" : "")}
          </Typography>
        </Box>
        <Typography
          textAlign="justify"
          whiteSpace="pre-line"
          sx={{ mt: 1, mb: 1 }}
        >
          {comment.content}
        </Typography>
      </Stack>
    </Stack>
  );
}
