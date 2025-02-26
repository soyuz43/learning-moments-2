// src/components/MyPosts.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const MyPosts = ({ posts, onDelete }) => {
  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div>
      <h1>My Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <button onClick={() => onDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
