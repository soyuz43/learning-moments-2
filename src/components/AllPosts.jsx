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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
      {/* Brutalist Title */}
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 mb-6 uppercase">
        ALL POSTS
      </h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl">
        <select
          value={selectedTopic}
          onChange={(e) => handleTopicChange(e.target.value)}
          className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
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
          className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition w-full md:w-auto"
        />

        <button
          onClick={resetFilters}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          Reset
        </button>
      </div>

      {/* Posts List */}
      <ul className="mt-8 w-full max-w-3xl space-y-6">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <li
              key={post.id}
              className="bg-gray-800 bg-opacity-80 shadow-lg backdrop-blur-md rounded-lg p-6 border border-gray-700 transition hover:scale-[1.02] hover:border-indigo-500 group relative"
            >
              {/* Apply dim effect to everything outside this item on hover */}
              <div className="group-hover:brightness-75 transition">
                <h2 className="text-3xl font-semibold text-indigo-400">{post.title}</h2>
                <p className="text-gray-400 text-sm mt-2">Topic: {post.topic?.name || "N/A"}</p>
                <p className="text-gray-300 text-sm whitespace-pre-line mt-3">{post.body}</p>
                <p className="text-gray-500 text-xs mt-4">❤️ {post.likes?.length || 0} Likes</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
