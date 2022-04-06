import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { API_URL, headers } from "../ApiConfig";

export const hasEditPermission = (user, post) =>
  user && (user.id === post.author.id || user.roles.includes("ROLE_ADMIN"));

export default function Post({ post, preview }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const optionsOpen = Boolean(anchorEl);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

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

  const onOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    setAnchorEl(null);

    setDeleteDialogOpen(false);
    setLoading(true);

    axios
      .delete(API_URL + `/post/${post.id}`, { headers: headers(currentUser) })
      .then((response) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login");
        }
      });
  };

  const handleEdit = () => {
    setAnchorEl(null);
    navigate(`/post/${post.id}/edit`);
  };

  return (
    <Box>
      <Stack sx={{ mt: 1, mb: 1, ml: 2, mr: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Link
              to={`/post/${post.id}`}
              variant="h4"
              color="inherit"
              underline="hover"
              component={NavLink}
            >
              {post.title}
            </Link>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "500ms" : "0ms",
              }}
              unmountOnExit
              sx={{ ml: 2 }}
            >
              <CircularProgress size={20} />
            </Fade>
          </Box>
          {!preview && hasEditPermission(currentUser, post) && (
            <Box>
              <IconButton
                id="options-button"
                aria-controls={optionsOpen ? "options-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={optionsOpen ? "true" : undefined}
                onClick={onOptionsClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="options-menu"
                anchorEl={anchorEl}
                open={optionsOpen}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "options-button",
                }}
              >
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => setDeleteDialogOpen(true)}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
              <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete this post?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
                  <Button onClick={handleDelete} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Box>
        <Typography fontWeight="bold" mt={1}>
          {post.author.name + " | "}
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
    </Box>
  );
}
