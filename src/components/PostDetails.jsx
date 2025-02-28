// src/components/PostDetails.jsx
import { useNavigate, Link } from "react-router-dom";

export const PostDetails = ({ post, currentUser, onLike }) => {
  const navigate = useNavigate();
  if (!post) return <div>No post data available.</div>;

  const isAuthor = currentUser?.id === post.userId;

  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-100 mb-6">
        {post.title}
      </h1>
      <p className="text-gray-300 mb-4">
        Author: <Link to={`/user-profile/${post.userId}`}>User {post.userId}</Link>
      </p>
      <p className="text-gray-400 mb-2">Topic: {post.topic?.name || "N/A"}</p>
      <p className="text-gray-300 mb-2">{post.body}</p>
      <p className="text-gray-500 mb-6">❤️ {post.likesCount || 0} Likes</p>

      {isAuthor ? (
        <button
          onClick={() => navigate(`/edit-post/${post.id}`)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={() => onLike(post)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          Like
        </button>
      )}
    </div>
  );
};
