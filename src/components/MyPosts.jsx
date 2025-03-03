// src/components/MyPosts.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPostsByUserId, deletePost } from "../services/postService";

export const MyPosts = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);
  
  // Tracks the “confirm?” state for each post
  const [confirmDelete, setConfirmDelete] = useState({});
  
  // Tracks the “removing” animation state for each post
  const [removingPosts, setRemovingPosts] = useState({});

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!currentUser) return;
      try {
        const posts = await getPostsByUserId(currentUser.id);
        setMyPosts(posts);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      }
    };
    fetchMyPosts();
  }, [currentUser]);

  // Step 1: On first click, set the button to "confirm?"
  // Step 2: On second click, animate removal, then delete.
  const handleDeleteClick = (postId) => {
    // If we have not yet set confirmDelete for this post or it's false, set it to true
    if (!confirmDelete[postId]) {
      setConfirmDelete((prev) => ({ ...prev, [postId]: true }));
    } else {
      // Already in "confirm" state -> proceed with delete
      handleDelete(postId);
    }
  };

  const handleDelete = async (postId) => {
    // Trigger removal animation
    setRemovingPosts((prev) => ({ ...prev, [postId]: true }));

    // Wait for the animation to finish (e.g., 500ms) before removing from DOM
    setTimeout(async () => {
      try {
        await deletePost(postId);
        setMyPosts((prev) => prev.filter((post) => post.id !== postId));
        
        // Clean up states
        setConfirmDelete((prev) => {
          const copy = { ...prev };
          delete copy[postId];
          return copy;
        });
        setRemovingPosts((prev) => {
          const copy = { ...prev };
          delete copy[postId];
          return copy;
        });
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }, 500); // matches the animation duration
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-20 bg-slate-900 text-white px-6 py-10 font-mono">
        <p className="text-slate-400 text-lg">Please log in to view your posts.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-900 text-white px-6 py-10 font-mono">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8">My Posts</h1>

        {myPosts.length === 0 ? (
          <p className="text-slate-400 text-lg">You haven't written any posts yet.</p>
        ) : (
          // A single-column layout with spaced tiles
          <ul className="grid grid-cols-1 gap-6 w-full max-w-3xl mx-auto">
            {myPosts.map((post) => {
              const isConfirming = !!confirmDelete[post.id];
              const isRemoving = !!removingPosts[post.id];

              return (
                <li
                  key={post.id}
                  // Apply an animation class if "removing"
                  className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg 
                              border-2 border-cyan-500/20 shadow-lg p-6 transition-all duration-500 
                              ${isRemoving ? "opacity-0 scale-75 translate-x-5 rotate-6" : "opacity-100"}`}
                >
                  <Link 
                    to={`/post/${post.id}`} 
                    className="block group"
                  >
                    <h2 className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-slate-300 mt-2 line-clamp-3">
                      {post.body}
                    </p>
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className={`mt-4 px-4 py-2 rounded-md border-2 border-transparent font-medium 
                                transition-all hover:scale-105
                                ${isConfirming 
                                  ? "bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-500/30" 
                                  : "bg-red-600 hover:bg-red-700 text-white border-red-600/20"
                                }`}
                  >
                    {isConfirming ? "Confirm?" : "Delete"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
