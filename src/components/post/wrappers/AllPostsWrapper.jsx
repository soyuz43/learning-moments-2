// src/components/post/wrappers/AllPostsWrapper.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPosts, getTopics, getLikes } from '../../../services/postService';
import { PostView } from '../ui/PostView';
import { addLike, removeLike } from '../../../services/engagementService';
import { useAsync } from '../../../hooks/useAsync';
import { filterPosts } from '../../../helpers/filterPosts';

export const AllPostsWrapper = ({ currentUser }) => {
  const navigate = useNavigate();
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState([]); // local state for likes

  const { 
    data: postsData, 
    loading, 
    error 
  } = useAsync(async () => {
    const [posts, topics, likesFromServer] = await Promise.all([
      getPosts(),
      getTopics(),
      getLikes(),
    ]);

    // Set local likes state initially (only for current user)
    setLikes(
      currentUser
        ? likesFromServer.filter(like => like.userId === currentUser.id)
        : []
    );

    const filteredPosts = filterPosts(posts, selectedTopic, searchTerm);

    return { 
      posts: filteredPosts, 
      topics 
    };
  }, [selectedTopic, searchTerm, currentUser?.id]);

  // Optimistic like toggle
  const handleLikeToggle = useCallback((postId) => {
    if (!currentUser) return;

    const existingLike = likes.find(
      (like) => like.userId === currentUser.id && like.postId === postId
    );

    if (existingLike) {
      // Check if the like is temporary by converting the id to a string.
      if (String(existingLike.id).startsWith("temp-")) {
        setLikes(prevLikes => prevLikes.filter(like => like.id !== existingLike.id));
        return;
      }
      // Optimistically remove like from state for persisted likes
      setLikes(prevLikes => prevLikes.filter(like => like.id !== existingLike.id));
      // Submit removal to the server
      removeLike(existingLike.id).catch((err) => {
        console.error("Error removing like:", err);
        // Revert state if server call fails
        setLikes(prevLikes => [...prevLikes, existingLike]);
      });
    } else {
      // Optimistically add a temporary like
      const tempLike = { id: `temp-${Date.now()}`, postId, userId: currentUser.id };
      setLikes(prevLikes => [...prevLikes, tempLike]);
      // Then, send request to add like
      addLike(postId, currentUser.id)
        .then((newLike) => {
          // Replace temporary like with the real like from the server
          setLikes(prevLikes =>
            prevLikes.map(like => like.id === tempLike.id ? newLike : like)
          );
        })
        .catch((err) => {
          console.error("Error adding like:", err);
          // Revert state if server call fails
          setLikes(prevLikes => prevLikes.filter(like => like.id !== tempLike.id));
        });
    }
  }, [currentUser, likes]);

  if (error) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-red-500 text-lg">
        Error: {error.message}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-cyan-300 text-lg">
        Loading posts...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ backgroundColor: 'rgb(15 23 42)' }}
      animate={{ 
        backgroundColor: hoveredPostId 
          ? 'rgb(15 23 42 / 0.92)' 
          : 'rgb(15 23 42)',
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="min-h-screen pt-20 font-mono"
    >
      <div className="container mx-auto px-4 py-4 text-slate-100">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">All Posts</h1>
        {postsData?.posts?.length === 0 ? (
          <p className="text-slate-400 text-lg">No posts found.</p>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative"
          >
            <AnimatePresence>
              {postsData?.posts?.map((post) => {
                const userLiked = likes.some(
                  (like) => like.postId === post.id
                );
                return (
                  <motion.div
                    key={post.id}
                    layout
                    onHoverStart={() => setHoveredPostId(post.id)}
                    onHoverEnd={() => setHoveredPostId(null)}
                    onClick={() =>
                      navigate(`/post/${post.id}`, { state: { post } })
                    }
                    className="relative cursor-pointer transition-all duration-150 ease-out bg-slate-800 shadow-lg rounded-xl p-6 overflow-hidden"
                  >
                    <PostView
                      post={post}
                      currentUser={currentUser}
                      userLiked={userLiked}
                      onToggleLike={() => handleLikeToggle(post.id)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
