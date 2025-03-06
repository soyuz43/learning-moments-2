// src/components/MyComments.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCommentsByUserId, deleteComment } from "../services/commentService";

export const MyComments = ({ currentUser }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    const fetchComments = async () => {
      try {
        const data = await getCommentsByUserId(currentUser.id);
        setComments(data);
      } catch (err) {
        setError(err.message || "Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [currentUser]);

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
        <p>Please log in to view your comments.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
        <p>Loading your comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-4xl font-bold mb-6 text-cyan-400 text-center">My Comments</h1>
        {comments.length === 0 ? (
          <p className="text-slate-400 text-lg text-center">You have not made any comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-200">{comment.body}</p>
                <p className="text-xs text-slate-400 mt-1">
                  On Post #{comment.postId} | {comment.date}
                </p>
                <button 
                  onClick={() => handleDelete(comment.id)}
                  className="mt-2 text-red-500 hover:text-red-400 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
