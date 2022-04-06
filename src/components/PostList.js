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
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
  const hasMore = pageNumber < totalPages;

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (postElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber(pageNumber + 1);
          }
        },
        { threshold: 0.8 }
      );
      if (postElement) observer.current.observe(postElement);
    },
    [loading, hasMore]
  );

  const onAdd = () => navigate("/create");

  const fetchPosts = (page) => {
    setLoading(true);
    axios
      .get(API_URL + `/post?page=${page}`, {
        headers: headers(currentUser),
      })
      .then((response) => {
        setLoading(false);
        setTotalPages(response.data.totalPages);
        setPosts([...posts, ...response.data.posts]);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    if (pageNumber <= totalPages) {
      fetchPosts(pageNumber);
    }
  }, [pageNumber]);

  return (
    <Container component="main" maxWidth="md" sx={{ pt: 2, pb: 2 }}>
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
      <Stack spacing={1} divider={<Divider />}>
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <Post post={post} preview={true}></Post>
              </div>
            );
          } else {
            return (
              <div key={post.id}>
                <Post post={post} preview={true}></Post>
              </div>
            );
          }
        })}
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
