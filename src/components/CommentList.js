import { CircularProgress, Fade, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { API_URL, headers } from "../utils/ApiConfig";
import { UserContext } from "../utils/UserContext";
import Comment from "./Comment";
import CommentEditor from "./CommentEditor";

export default function CommentList({ post }) {
  const { currentUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const hasMore = pageNumber < totalPages;

  const observer = useRef();
  const lastCommentElementRef = useCallback(
    (commentElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber(pageNumber + 1);
          }
        },
        { threshold: 0.2 }
      );
      if (commentElement) observer.current.observe(commentElement);
    },
    [loading, hasMore]
  );

  const fetchComments = (page) => {
    setLoading(true);
    axios
      .get(API_URL + `/comment?page=${page}&post=${post.id}`, {
        headers: headers(currentUser),
      })
      .then((response) => {
        setLoading(false);
        setTotalPages(response.data.totalPages);
        if (page === 1) {
          setComments(response.data.comments);
        } else {
          setComments([...comments, ...response.data.comments]);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (pageNumber <= totalPages) {
      fetchComments(pageNumber);
    }
  }, [pageNumber, totalPages]);

  const reloadComments = () => {
    if (pageNumber === 1) {
      fetchComments(1);
    } else {
      setPageNumber(1);
    }
  };

  const handleCommentEdit = (comment) => {
    const updatedComments = [
      comment,
      ...comments.filter((c) => c.id !== comment.id),
    ];
    setComments(updatedComments);
  };

  return (
    <Box>
      <CommentEditor post={post} onSuccess={reloadComments}></CommentEditor>
      <Stack spacing={2} mt={2}>
        {comments.map((comment, index) => {
          if (index === comments.length - 1) {
            return (
              <div key={comment.id} ref={lastCommentElementRef}>
                <Comment
                  comment={comment}
                  post={post}
                  onDelete={reloadComments}
                />
              </div>
            );
          } else {
            return (
              <div key={comment.id}>
                <Comment
                  comment={comment}
                  post={post}
                  onDelete={reloadComments}
                  onEdit={handleCommentEdit}
                />
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
    </Box>
  );
}
