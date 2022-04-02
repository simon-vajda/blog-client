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
  const { currentUser, setCurrentUser } = useContext(UserContext);

  let { id } = useParams();
  useEffect(() => {
    axios
      .get(API_URL + `/post/${id}`, { headers: headers(currentUser) })
      .then((response) => {
        setPost(response.data);
        console.log(post);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setCurrentUser(null);
          navigate("/login");
        }
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 3 }}>
      {post && <Post post={post} preview={false}></Post>}
    </Container>
  );
}
