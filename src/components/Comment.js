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
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { grey } from "@mui/material/colors";
import TimeAgo from "javascript-time-ago";
import { useContext, useState } from "react";
import { UserContext } from "../utils/UserContext";
import axios from "axios";
import { API_URL, headers } from "../utils/ApiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import CommentEditor from "./CommentEditor";

export const hasEditPermission = (user, comment) =>
  user && (user.id === comment.author.id || user.roles.includes("ROLE_ADMIN"));

export default function Comment({ comment, post, onDelete, onEdit }) {
  const timeAgo = new TimeAgo("en-GB");
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const optionsOpen = Boolean(anchorEl);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const onOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    setAnchorEl(null);

    setDeleteDialogOpen(false);
    setLoading(true);

    axios
      .delete(API_URL + `/comment/${comment.id}`, {
        headers: headers(currentUser),
      })
      .then((response) => {
        setLoading(false);
        onDelete(comment);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login", { state: { fromUrl: location.pathname } });
        }
      });
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setEditorOpen(true);
  };

  const handleUpdate = (comment) => {
    setEditorOpen(false);
    onEdit(comment);
  };

  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: optionsOpen ? grey[100] : null,
        p: 1,
        borderRadius: 2,
      }}
    >
      <AccountCircle fontSize="large" sx={{ color: grey[500], mr: 1 }} />

      <Stack width="100%">
        <Box>
          <Typography display="inline" fontWeight="bold">
            {comment.author.name}
          </Typography>

          <Typography
            display="inline"
            ml={1}
            color={grey[500]}
            fontSize="0.8em"
          >
            {"• " +
              timeAgo.format(new Date(comment.updatedOn)) +
              (comment.createdOn !== comment.updatedOn ? " (edited)" : "")}
          </Typography>

          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? "500ms" : "0ms",
            }}
            unmountOnExit
            sx={{ ml: 2 }}
          >
            <CircularProgress size="1em" />
          </Fade>
        </Box>

        {editorOpen ? (
          <CommentEditor
            post={post}
            comment={comment}
            onSuccess={handleUpdate}
            onCancel={() => setEditorOpen(false)}
            sx={{ mt: 1 }}
          ></CommentEditor>
        ) : (
          <Typography
            textAlign="justify"
            whiteSpace="pre-line"
            sx={{ mt: 1, mb: 1 }}
          >
            {comment.content}
          </Typography>
        )}
      </Stack>

      {hasEditPermission(currentUser, comment) && !editorOpen && (
        <Box ml={1} mt={1}>
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
              Are you sure you want to delete this comment?
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
    </Stack>
  );
}
