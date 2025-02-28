// src/components/MyPosts.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPostsByUserId, deletePost } from "../services/postService";

export const MyPosts = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);

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

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setMyPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!currentUser) {
    return <p>Please log in to view your posts.</p>;
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 mb-6">
        My Posts
      </h1>
      {myPosts.length === 0 ? (
        <p className="text-gray-400">You haven't written any posts yet.</p>
      ) : (
        <ul className="space-y-4 w-full max-w-2xl">
          {myPosts.map((post) => (
            <li
              key={post.id}
              className="bg-gray-800 bg-opacity-80 shadow-lg backdrop-blur-md rounded-lg p-4 border border-gray-700"
            >
              <Link to={`/post/${post.id}`}>
                <h2 className="text-xl text-indigo-400 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
