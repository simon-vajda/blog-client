import {
  CircularProgress,
  Container,
  Divider,
  Fab,
  Fade,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL, headers } from "../ApiConfig";
import { UserContext } from "../UserContext";
import Post from "./Post";
import { Box } from "@mui/system";

export default function PostList() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const onAdd = () => navigate("/create");

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL + "/post", { headers: headers(currentUser) })
      .then((response) => {
        setLoading(false);
        setPageNumber(response.data.pageNumber);
        setTotalPages(response.data.totalPages);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login");
        }
      });
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Fab
        color="secondary"
        aria-label="add"
        onClick={onAdd}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        <AddIcon />
      </Fab>
      <Stack spacing={1} divider={<Divider />} mt={2} mb={4}>
        {posts.map((post) => (
          <Post post={post} preview={true}></Post>
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? "500ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </Box>
      </Stack>
    </Container>
  );
}
