// src/hooks/usePostComments.js
import { useState, useEffect } from "react";
import { getCommentsByPostId } from "../services/commentService";

export const usePostComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);

  useEffect(() => {
    if (!postId) return;
    const fetchComments = async () => {
      try {
        const data = await getCommentsByPostId(postId);
        setComments(data);
      } catch (error) {
        setErrorComments(error);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [postId]);

  return { comments, setComments, loadingComments, errorComments };
};
