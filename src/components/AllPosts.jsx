// AllPosts.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts, getTopics } from "../services/postService";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation state to reset filters
  useEffect(() => {
    if (location.state?.resetFilters) {
      setSelectedTopic("");
      setSearchTerm("");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  // Fetch posts and topics on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, topicsData] = await Promise.all([getPosts(), getTopics()]);
        setPosts(postsData);
        setTopics(topicsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter logic
  const handleTopicChange = (topic) => setSelectedTopic(topic);
  const handleSearchChange = (term) => setSearchTerm(term);
  const resetFilters = () => {
    setSelectedTopic("");
    setSearchTerm("");
  };

  // Navigation to post details
  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const filteredPosts = posts.filter((post) => {
    const topicMatch = !selectedTopic || post.topic?.name === selectedTopic;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return topicMatch && searchMatch;
  });

  // Group posts by topic
  const postsByTopic = {};
  filteredPosts.forEach((post) => {
    const topicName = post.topic?.name || "General";
    if (!postsByTopic[topicName]) {
      postsByTopic[topicName] = [];
    }
    postsByTopic[topicName].push(post);
  });

  // Get unique topics from filtered posts
  const uniqueTopics = Object.keys(postsByTopic);

  return (
    <div className="bg-slate-900 min-h-screen pt-20 font-mono">
      <div className="container mx-auto px-8 py-8 text-slate-100">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">All Posts</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <select
            value={selectedTopic}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="bg-slate-800 border-2 border-cyan-500/20 text-slate-200 px-4 py-2 rounded-lg 
                       focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all font-medium"
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
            className="bg-slate-800 border-2 border-cyan-500/20 text-slate-200 px-4 py-2 rounded-lg 
                       focus:ring-2 focus:ring-cyan-500 focus:outline-none w-full md:w-64 
                       transition-all font-medium"
          />

          <button
            onClick={resetFilters}
            className="bg-cyan-600/80 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg 
                       font-medium transition-all hover:scale-105 border-2 border-cyan-500/20"
          >
            Reset
          </button>
        </div>

        {/* Column-based layout with topics at top */}
        {uniqueTopics.length === 0 ? (
          <p className="text-slate-400 text-lg">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueTopics.map((topicName) => (
              <div key={topicName} className="flex flex-col">
                {/* Topic Header with explicit JetBrains Mono font */}
                <h2 
                  className="text-xl text-cyan-300 py-3 mb-4 border-b-2 border-cyan-500/30 text-center"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {topicName}
                </h2>
                
                {/* Posts under this topic in a vertical column */}
                <div className="space-y-8 flex-1">
                  {postsByTopic[topicName].map((post) => (
                    <div
                      key={post.id}
                      onClick={() => navigateToPost(post.id)}
                      className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg 
                                shadow-lg p-6 border-2 border-cyan-500/20 hover:border-cyan-500/40 
                                transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10
                                cursor-pointer"
                    >
                      <h3 className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 
                                    transition-colors duration-300 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-300 mt-3 line-clamp-3">{post.body}</p>

                      {/* Enhanced Action bar animation */}
                      <div className="mt-4 overflow-hidden transition-all duration-300 ease-in-out border-t border-cyan-500/30 pt-0 opacity-0 transform translate-y-2 
                                      group-hover:opacity-100 group-hover:translate-y-0 group-hover:pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400 text-sm font-medium">Actions</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent navigation when clicking the button
                            }}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 text-sm 
                                      font-medium transition-all duration-200 hover:scale-105 flex items-center
                                      rounded-md"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 
                                  00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            Like
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
