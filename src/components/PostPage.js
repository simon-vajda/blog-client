import { Box, CircularProgress, Container, Fade } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, headers } from "../ApiConfig";
import { UserContext } from "../UserContext";
import Post from "./Post";

export default function PostPage() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  let { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL + `/post/${id}`, { headers: headers(currentUser) })
      .then((response) => {
        setLoading(false);
        setPost(response.data);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login", { state: { fromUrl: `/post/${id}` } });
        } else if (error.response.status === 404) {
          navigate("/");
        }
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 2 }}>
      {post && <Post post={post} preview={false}></Post>}
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
    </Container>
  );
}
