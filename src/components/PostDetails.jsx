
// PostDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostById } from "../services/postService";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleBackToList = () => {
    navigate("/", { state: { resetFilters: false } });
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono">
        <div className="container mx-auto px-8 py-8 text-slate-100">
          <p className="text-cyan-300 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono">
        <div className="container mx-auto px-8 py-8 text-slate-100">
          <p className="text-slate-400 text-lg">No post data available.</p>
        </div>
      </div>
    );
  }

  const isAuthor = currentUser && currentUser.id === post.userId;

  return (
    <div className="bg-slate-900 min-h-screen pt-20 font-mono">
      <div className="container mx-auto px-8 py-8 text-slate-100">
        <button
          onClick={handleBackToList}
          className="mb-6 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Posts
        </button>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg 
                      shadow-lg p-8 border-2 border-cyan-500/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">{post.title}</h1>
              <p className="text-sm text-cyan-500/80 font-medium">
                Topic: {post.topic?.name || "General"}
              </p>
            </div>
            
            {isAuthor && (
              <Link
                to={`/edit-post/${post.id}`}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg 
                          font-medium transition-all hover:scale-105 border-2 border-cyan-500/20"
              >
                Edit
              </Link>
            )}
          </div>

          <div className="border-t border-b border-cyan-500/30 py-6 my-4">
            <p className="text-slate-300 whitespace-pre-line">{post.body}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400">
                Author:{" "}
                <Link to={`/user-profile/${post.userId}`} className="text-cyan-400 hover:text-cyan-300 hover:underline">
                  {post.authorName || `User ${post.userId}`}
                </Link>
              </p>
              <p className="text-slate-500 mt-1">
                {post.likesCount || 0} Likes
              </p>
            </div>

            {!isAuthor && (
              <button 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg 
                          font-medium transition-all hover:scale-105 border-2 border-cyan-500/20 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 
                      00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Like
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};