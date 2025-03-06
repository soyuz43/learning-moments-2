// src/components/post/wrappers/PostDetailsWrapper.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { usePostDetails } from "../../../hooks/usePostDetails";
import { usePostComments } from "../../../hooks/usePostComments";
import { addComment, deleteComment } from "../../../services/commentService";
import { PostView } from "../ui/PostView";

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

  // Destructure setComments from the hook to update comments on add/delete
  const { comments, setComments, loadingComments, errorComments } = usePostComments(postId);
  const [newComment, setNewComment] = useState("");

  const handleBack = () => {
    navigate("/", { state: { resetFilters: false } });
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentToAdd = {
      postId: Number(postId),
      userId: currentUser.id,
      body: newComment,
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      const createdComment = await addComment(commentToAdd);
      setComments((prev) => [...prev, createdComment]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
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

        {/* Comments Section */}
        <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Comments</h2>
          {loadingComments ? (
            <p className="text-cyan-300">Loading comments...</p>
          ) : errorComments ? (
            <p className="text-red-500">Error loading comments.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="bg-slate-700 p-4 rounded-lg flex justify-between items-start"
                >
                  <div className="flex-1">
                    <p className="text-slate-200">{comment.body}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      By User {comment.userId} on {comment.date}
                    </p>
                  </div>
                  {currentUser?.id === comment.userId && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-400 text-sm ml-4"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Add Comment Input */}
          {currentUser && (
            <div className="mt-6">
              <textarea
                className="w-full p-3 rounded-lg bg-slate-700 text-slate-200 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="Add your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="2"
              />
              <button
                onClick={handleAddComment}
                className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition font-medium w-full"
              >
                Post Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
