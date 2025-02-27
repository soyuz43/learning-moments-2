// src/components/AllPosts.jsx
import { AllPostsHandler } from "./AllPostsHandler";

export const AllPosts = () => {
  const {
    topics,
    filteredPosts,
    selectedTopic,
    searchTerm,
    handleTopicChange,
    handleSearchChange,
    resetFilters,
  } = AllPostsHandler();

  return (
    <div>
      <h1>All Posts</h1>
      <select value={selectedTopic} onChange={(e) => handleTopicChange(e.target.value)}>
        <option value="">All Topics</option>
        {Array.isArray(topics) &&
          topics.map((topic) => (
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
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>Topic: {post.topic?.name || "N/A"}</p>
            <p>{post.body}</p>
            <p>Likes: {post.likes?.length || 0}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
