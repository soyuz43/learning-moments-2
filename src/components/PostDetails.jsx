// src/components/PostDetails.jsx
import { Link } from 'react-router-dom';

export const PostDetails = ({ post, currentUser, onLike, onEdit }) => {
  if (!post) {
    return <div>No post data available.</div>;
  }

  const isAuthor = currentUser?.id === post.userId;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        Author: <Link to={`/user-profile/${post.userId}`}>{post.authorName || `User ${post.userId}`}</Link>
      </p>
      <p>Topic: {post.topic?.name || 'N/A'}</p>
      <p>Date: {post.date ? new Date(post.date).toLocaleDateString() : 'N/A'}</p>
      <p>{post.body || 'No content available.'}</p>
      <p>Likes: {post.likesCount || 0}</p>
      {isAuthor ? (
        <button onClick={() => onEdit(post)}>Edit</button>
      ) : (
        <button onClick={() => onLike(post)}>Like</button>
      )}
    </div>
  );
};
