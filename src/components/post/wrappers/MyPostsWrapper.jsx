// learning-moments\src\components\post\wrappers\MyPostsWrapper.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PostView } from '../ui/PostView';
import { deletePost } from '../../../services/postService';

// Make sure to use 'export const' here
export const MyPostsWrapper = ({ post, currentUser, onPostDeleted, isRemoving }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [localRemoving, setLocalRemoving] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // Combine local and parent removing states
  const removing = localRemoving || isRemoving;

  useEffect(() => {
    if (isRemoving) {
      setLocalRemoving(true);
    }
  }, [isRemoving]);

  const handleDelete = async () => {
    setLocalRemoving(true);
    
    try {
      await deletePost(post.id);
      // Signal to parent component to start removal process
      onPostDeleted(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
      setLocalRemoving(false); // Reset if there's an error
      setConfirmDelete(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (!confirmDelete) {
      setConfirmDelete(true);
    } else {
      handleDelete();
    }
  };

  const handleClick = () => {
    if (!removing) {
      navigate(`/edit-post/${post.id}`, { state: { post } });
    }
  };

  const hoverVariants = {
    normal: {
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      y: 0,
      opacity: 0.95,
      filter: "brightness(1)",
      zIndex: 0
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      y: -4,
      opacity: 1,
      filter: "brightness(1.05)",
      zIndex: 10
    },
    removing: {
      scale: 0.8,
      opacity: 0.6,
      x: 50,
      y: 10,
      rotate: -10,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      zIndex: -1
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      onHoverStart={() => !removing && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      layout
      style={{ 
        transformOrigin: 'center center',
        position: 'relative' 
      }}
      initial="normal"
      animate={removing ? "removing" : (hovered ? "hover" : "normal")}
      exit={{
        opacity: 0,
        scale: 0.7,
        rotate: -10,
        y: 10,
        x: 50,
        transition: { duration: 0.4, ease: "easeInOut" }
      }}
      variants={hoverVariants}
      transition={{
        type: 'tween', 
        ease: 'easeOut',
        duration: 0.2
      }}
      className="cursor-pointer relative bg-slate-800 shadow-lg rounded-xl p-6 h-full w-full"
    >
      <PostView
        post={post}
        currentUser={currentUser}
        userLiked={false}
        onToggleLike={() => {}}
        showDeleteButton={!removing}
        onDelete={handleDeleteClick}
        confirmDelete={confirmDelete}
        isAuthor={currentUser && currentUser.id === post.userId}
        onEdit={() => !removing && navigate(`/edit-post/${post.id}`)}
      />
    </motion.div>
  );
};
