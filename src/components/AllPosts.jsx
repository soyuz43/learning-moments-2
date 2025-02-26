// components/AllPosts.jsx
import React from 'react';
import { AllPostsHandler } from './AllPostsHandler';

export const AllPosts = () => {
  const {
    topics,
    posts,
    selectedTopic,
    searchTerm,
    handleTopicChange,
    handleSearchChange,
  } = AllPostsHandler();

  return (
    <div>
      <h1>All Posts</h1>
      <select value={selectedTopic} onChange={(e) => handleTopicChange(e.target.value)}>
        <option value="">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.name}>
            {topic.name}
          </option>
        ))}
      </select>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search posts"
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>Topic: {post.topic.name}</p>
            <p>Likes: {post.likes.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};