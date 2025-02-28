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
    <div className="bg-slate-900 min-h-screen pt-20">
      {/* Container */}
      <div className="container mx-auto px-4 py-8 text-slate-100">
        <h1 className="text-4xl font-bold mb-8">All Posts</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <select
            value={selectedTopic}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
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
            placeholder="Search posts..."
            className="bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none w-full md:w-auto"
          />

          <button
            onClick={resetFilters}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md font-medium transition"
          >
            Reset
          </button>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <p className="text-slate-400">No posts found.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <li
                key={post.id}
                className="bg-slate-800 rounded-lg shadow-md p-4 border border-slate-700"
              >
                <h2 className="text-xl font-semibold text-slate-100 mb-1">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-400 mb-2">
                  Topic: {post.topic?.name || "N/A"}
                </p>
                <p className="text-slate-300 mb-2">{post.body}</p>
                <div className="mt-2 border-t border-slate-700 pt-2 text-slate-400 text-sm">
                  Likes: {post.likes?.length || 0}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
