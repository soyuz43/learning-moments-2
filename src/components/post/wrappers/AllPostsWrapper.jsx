// src/components/post/wrappers/AllPostsWrapper.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPosts, getTopics, getLikes } from '../../../services/postService';
import { PostView } from '../ui/PostView';
import { addLike, removeLike } from '../../../services/engagementService';
import { useAsync } from '../../../hooks/useAsync';

// Helper to set transform origin based on column
const getTransformOrigin = (index, columns = 3) => {
  const colIndex = index % columns;
  if (colIndex === 0) return 'left center';
  if (colIndex === columns - 1) return 'right center';
  return 'center center';
};

export const AllPostsWrapper = ({ currentUser }) => {
  const navigate = useNavigate();
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { 
    data: postsData, 
    loading, 
    error 
  } = useAsync(async () => {
    const [posts, topics, likes] = await Promise.all([
      getPosts(),
      getTopics(),
      getLikes(),
    ]);

    const filteredPosts = posts.filter(post => 
      (!selectedTopic || post.topic?.name === selectedTopic) &&
      (!searchTerm || post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const userLikes = currentUser 
      ? likes.filter(like => like.userId === currentUser.id) 
      : [];

    return { 
      posts: filteredPosts, 
      topics, 
      likes: userLikes 
    };
  }, [selectedTopic, searchTerm, currentUser?.id]);

  const handleLikeToggle = useCallback(async (postId) => {
    if (!currentUser) return;

    try {
      const existingLike = postsData?.likes?.find(
        (like) => like.userId === currentUser.id && like.postId === postId
      );

      if (existingLike) {
        await removeLike(existingLike.id);
        postsData.likes = postsData.likes.filter((like) => like.id !== existingLike.id);
      } else {
        const newLike = await addLike(postId, currentUser.id);
        postsData.likes = [...(postsData.likes || []), newLike];
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }, [currentUser, postsData]);

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
              {postsData?.posts?.map((post, index) => {
                const userLiked = postsData.likes?.some(
                  (like) => like.postId === post.id
                );
                const isHovered = hoveredPostId === post.id;

                return (
                  <motion.div
                    key={post.id}
                    layout
                    style={{
                      transformOrigin: getTransformOrigin(index, 3),
                    }}
                    animate={{
                      scale: isHovered ? 1.07 : 1,
                      opacity: hoveredPostId && !isHovered ? 0.85 : 1,
                      filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 18,
                    }}
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
