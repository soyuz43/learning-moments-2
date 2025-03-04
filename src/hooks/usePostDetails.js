// src/hooks/usePostDetails.js
import { useState, useEffect, useCallback } from 'react';
import { getPostById } from '../services/postService';
import { addLike, removeLike } from '../services/engagementService';

export const usePostDetails = (postId, currentUser, initialPost = null) => {
  const [post, setPost] = useState(initialPost);
  const [likes, setLikes] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const [loading, setLoading] = useState(initialPost ? false : true);
  const [error, setError] = useState(null);

  const fetchPostData = useCallback(async () => {
    try {
      setLoading(true);
      const postData = await getPostById(postId);
      setPost(postData);

      const likesRes = await fetch(`http://localhost:8088/likes?postId=${postId}`);
      const likesData = await likesRes.json();
      setLikes(likesData);

      if (currentUser) {
        const liked = likesData.some((like) => Number(like.userId) === Number(currentUser.id));
        setUserLiked(liked);
      }
    } catch (err) {
      console.error('Error fetching post details:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [postId, currentUser]);

  useEffect(() => {
    if (postId) {
      fetchPostData();
    }
  }, [postId, fetchPostData]);

  const toggleLike = async () => {
    if (!currentUser) {
      alert('Please log in to like this post.');
      return;
    }
    try {
      if (userLiked) {
        const existingLike = likes.find((like) => Number(like.userId) === Number(currentUser.id));
        if (existingLike) {
          await removeLike(existingLike.id);
          setLikes((prev) => prev.filter((like) => like.id !== existingLike.id));
          setUserLiked(false);
        }
      } else {
        const newLike = await addLike(post.id, currentUser.id);
        setLikes((prev) => [...prev, newLike]);
        setUserLiked(true);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      setError(err);
    }
  };

  return {
    post,
    likes,
    userLiked,
    toggleLike,
    loading,
    error,
  };
};
