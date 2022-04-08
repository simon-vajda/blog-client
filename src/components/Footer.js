import { Link, Stack } from "@mui/material";
import { Box } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import { grey } from "@mui/material/colors";

export default function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      sx={{
        pt: 4,
        pb: 4,
        backgroundColor: grey[200],
      }}
    >
      <Stack spacing={1}>
        <Box display="flex" alignItems="center">
          <GitHubIcon fontSize="small" />
          <Link
            href="https://github.com/simon-vajda/blog-client"
            target="_blank"
            underline="hover"
            variant="body1"
            ml={1}
          >
            Frontend repo
          </Link>
        </Box>
        <Box display="flex" alignItems="center">
          <GitHubIcon fontSize="small" />
          <Link
            href="https://github.com/simon-vajda/blog-server"
            target="_blank"
            underline="hover"
            variant="body1"
            ml={1}
          >
            Backend repo
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}
