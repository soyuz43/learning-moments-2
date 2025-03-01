import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../services/postService";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams(); // Extract postId from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-gray-300">Loading post...</p>;
  }

  if (!post) {
    return <p className="text-gray-400">No post data available.</p>;
  }

  const isAuthor = currentUser && currentUser.id === post.userId;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
      <div className="bg-gray-800 bg-opacity-80 shadow-lg backdrop-blur-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-indigo-400">{post.title}</h1>
        <p className="text-gray-400 mt-2">
          Author:{" "}
          <Link
            to={`/user-profile/${post.userId}`}
            className="text-indigo-500 hover:underline"
          >
            {post.authorName || `User ${post.userId}`}
          </Link>
        </p>
        <p className="text-gray-500">Topic: {post.topic?.name || "N/A"}</p>
        <p className="text-gray-400 mt-3 whitespace-pre-line">{post.body}</p>
        <p className="text-gray-500 mt-3">❤️ {post.likesCount || 0} Likes</p>

        {isAuthor ? (
          <Link
            to={`/edit-post/${post.id}`}
            className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
          >
            Edit
          </Link>
        ) : (
          <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Like
          </button>
        )}
      </div>
    </div>
  );
};
