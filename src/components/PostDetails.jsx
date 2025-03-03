// src/components/PostDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostById } from "../services/postService";
import { addLike, removeLike } from "../services/engagementService";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]); // store all likes for this post
  const [userLiked, setUserLiked] = useState(false); // track if user liked

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 1. Fetch the post
        const data = await getPostById(postId);
        setPost(data);

        // 2. Fetch likes for this post
        const likesRes = await fetch(`http://localhost:8088/likes?postId=${postId}`);
        const likesData = await likesRes.json();
        setLikes(likesData);

        // 3. Check if currentUser already liked it
        if (currentUser) {
          const foundLike = likesData.find((lk) => lk.userId === currentUser.id);
          if (foundLike) setUserLiked(true);
        }
      } catch (error) {
        console.error("Error fetching post or likes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, currentUser]);

  const isAuthor = currentUser && currentUser.id === post?.userId;

  // Handler to toggle like
  const handleLike = async () => {
    if (!currentUser) {
      alert("Please log in to like this post.");
      return;
    }

    try {
      if (userLiked) {
        // find the existing like
        const existingLike = likes.find((lk) => lk.userId === currentUser.id);
        if (existingLike) {
          await removeLike(existingLike.id);
          setLikes((prev) => prev.filter((lk) => lk.id !== existingLike.id));
          setUserLiked(false);
        }
      } else {
        // add new like
        const newLike = await addLike(post.id, currentUser.id);
        setLikes((prev) => [...prev, newLike]);
        setUserLiked(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
              {/* Display updated likes count */}
              <p className="text-slate-500 mt-1">{likes.length} Likes</p>
            </div>

            {!isAuthor && (
              <button 
                onClick={handleLike}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg 
                          font-medium transition-all hover:scale-105 border-2 border-cyan-500/20 flex items-center"
              >
                {userLiked ? (
                  <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 
                      2 12.28 2 8.5 2 5.42 4.42 
                      3 7.5 3c1.74 0 3.41.81 
                      4.5 2.09A6.004 6.004 0 0116.5 
                      3C19.58 3 22 5.42 22 
                      8.5c0 3.78-3.4 6.86-8.55 
                      11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 
                        000 6.364L12 20.364l7.682-7.682a4.5 
                        4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 
                        4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
                {userLiked ? "Unlike" : "Like"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
