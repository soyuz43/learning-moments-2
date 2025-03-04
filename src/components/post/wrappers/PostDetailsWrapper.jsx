// src/components/post/wrappers/PostDetailsWrapper.jsx
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePostDetails } from '../../../hooks/usePostDetails';
import { PostView } from '../ui/PostView';

export const PostDetailsWrapper = ({ currentUser }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialPost = location.state?.post || null;
  const { post, userLiked, toggleLike, loading, error } = usePostDetails(
    postId,
    currentUser,
    initialPost
  );

  const handleBack = () => {
    navigate('/', { state: { resetFilters: false } });
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono">
        <div className="container mx-auto px-4 py-4 text-slate-100">
          <p className="text-cyan-300 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono">
        <div className="container mx-auto px-4 py-4 text-slate-100">
          <p className="text-red-500">Error loading post.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen pt-20 font-mono">
      <div className="container mx-auto px-4 py-4 text-slate-100">
        <PostView
          post={post}
          currentUser={currentUser}
          userLiked={userLiked}
          onToggleLike={toggleLike}
          isAuthor={currentUser && Number(currentUser.id) === Number(post?.userId)}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};
