import { Button, Divider, Link, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";

export default function Post({ post, preview }) {
  const localDateFormat = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-UK", options);
  };

  return (
    <Box>
      <Stack sx={{ mt: 1, mb: 1, ml: 2, mr: 2 }}>
        <Link
          to={`/post/${post.id}`}
          variant="h4"
          color="inherit"
          underline="hover"
          component={NavLink}
        >
          {post.title}
        </Link>
        <Typography fontWeight="bold" mt={1}>
          {post.author + " | "}
          {post.updatedOn === post.createdOn
            ? "Created on " + localDateFormat(post.createdOn)
            : "Updated on " + localDateFormat(post.updatedOn)}
        </Typography>
        <Typography variant="body1" mt={2} textAlign="justify">
          {preview && post.content.length > 800
            ? post.content.substring(0, 800) + "..."
            : post.content}
        </Typography>
        {preview && post.content.length > 800 && (
          <Box display="flex" alignItems="center" flexDirection="column" mt={1}>
            <Button component={NavLink} to={`/post/${post.id}`} variant="text">
              Read more
            </Button>
          </Box>
        )}
      </Stack>
      <Divider />
    </Box>
  );
}
