// src/components/post/ui/PostView.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const PostView = ({
  post,
  currentUser,
  userLiked,
  onToggleLike,
  onDelete,
  confirmDelete,
  showDeleteButton,
  isAuthor,
  onBack,
  children,
}) => {
  if (!post) {
    return <div className="text-white">No post available.</div>;
  }

  return (
    <div className="bg-slate-900 font-mono">
      <div className="container mx-auto px-4 py-2 text-slate-100">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-2 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Posts
          </button>
        )}

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-3 border border-cyan-500/20">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h1 className="text-xl font-bold text-cyan-400">{post.title}</h1>
              <p className="text-xs text-cyan-500/80">
                Topic: {post.topic?.name || 'General'}
              </p>
            </div>
            {isAuthor && (
              <Link
                to={`/edit-post/${post.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md text-xs font-medium transition-all hover:scale-105 border border-blue-500/20"
              >
                Edit
              </Link>
            )}
          </div>

          <div className="border-t border-b border-cyan-500/30 py-1 my-1">
            <p className="text-slate-300 whitespace-pre-line text-xs">{post.body}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-xs">
                Author:{' '}
                <Link
                  to={`/user-profile/${post.userId}`}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  {post.authorName || `User ${post.userId}`}
                </Link>
              </p>
              {children}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(e);
              }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-2 py-1 rounded-md text-xs font-medium transition-all hover:scale-105 border border-cyan-500/20 flex items-center"
            >
              {userLiked ? (
                <svg
                  className="w-3 h-3 mr-1 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.004 6.004 0 0116.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
              {userLiked ? 'Unlike' : 'Like'}
            </button>
          </div>

          {showDeleteButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
              className={`mt-2 text-white px-2 py-1 rounded-md text-xs font-medium transition-all hover:scale-105 border ${
                confirmDelete
                  ? 'bg-yellow-500 hover:bg-yellow-600 border-yellow-500/20'
                  : 'bg-red-600 hover:bg-red-700 border-red-600/20'
              }`}
            >
              {confirmDelete ? 'Confirm?' : 'Delete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
PostView.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  userLiked: PropTypes.bool.isRequired,
  onToggleLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  confirmDelete: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  isAuthor: PropTypes.bool,
  onBack: PropTypes.func,
  children: PropTypes.node,
};

PostView.defaultProps = {
  currentUser: null,
  showDeleteButton: false,
  confirmDelete: false,
  isAuthor: false,
  onDelete: null,
  onBack: null,
  children: null,
};
