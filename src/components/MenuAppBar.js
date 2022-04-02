import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function MenuAppBar() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            variant="h6"
            display="inline"
            color="inherit"
            underline="hover"
            component={NavLink}
          >
            Blog
          </Link>
        </Box>
        {currentUser ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Typography mr={1}>{currentUser.name}</Typography>
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" component={NavLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
