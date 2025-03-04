import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PostView } from '../ui/PostView';
import { deletePost } from '../../../services/postService';

export const MyPostsWrapper = ({ post, currentUser, onPostDeleted }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleDelete = async () => {
    setRemoving(true);
    setTimeout(async () => {
      try {
        await deletePost(post.id);
        if (onPostDeleted) {
          onPostDeleted(post.id);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }, 400);
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
    navigate(`/edit-post/${post.id}`, { state: { post } });
  };

  return (
    <motion.div
      onClick={handleClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      layout
      style={{ transformOrigin: 'left center' }} 
      animate={{
        scale: hovered ? 1.08 : 1,
        opacity: hovered ? 1 : 0.95,
        filter: hovered ? 'brightness(1.1)' : 'brightness(1)',
      }}
      exit={{
        opacity: 0,
        scale: 0.7,
        rotate: -10,
        y: 10,
        transition: { duration: 0.4, ease: 'easeInOut' },
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15,
      }}
      className={`cursor-pointer transition-all duration-500 relative bg-slate-800 shadow-lg rounded-xl p-6 ${
        removing ? 'opacity-0 scale-75 translate-x-5 rotate-6' : 'opacity-100'
      }`}
    >
      <PostView
        post={post}
        currentUser={currentUser}
        userLiked={false}
        onToggleLike={() => {}}
        showDeleteButton={true}
        onDelete={handleDeleteClick}
        confirmDelete={confirmDelete}
        isAuthor={currentUser && currentUser.id === post.userId}
        onEdit={() => navigate(`/edit-post/${post.id}`)}
      />
    </motion.div>
  );
};
