// src/components/AllPosts.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts, getTopics } from "../services/postService";
import { addLike, removeLike } from "../services/engagementService";

export const AllPosts = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [likes, setLikes] = useState([]); // Storing all likes
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Reset filters if needed
  useEffect(() => {
    if (location.state?.resetFilters) {
      setSelectedTopic("");
      setSearchTerm("");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  // 2. Fetch posts, topics, and likes on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // getPosts, getTopics
        const [postsData, topicsData] = await Promise.all([
          getPosts(),
          getTopics(),
        ]);

        setPosts(postsData);
        setTopics(topicsData || []);

        // Also fetch likes to know if user liked a post
        const likesResponse = await fetch("http://localhost:8088/likes");
        const likesData = await likesResponse.json();
        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 3. Filter logic
  const handleTopicChange = (topic) => setSelectedTopic(topic);
  const handleSearchChange = (term) => setSearchTerm(term);
  const resetFilters = () => {
    setSelectedTopic("");
    setSearchTerm("");
  };

  // 4. Navigation helper
  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  // 5. Check if currentUser liked a post
  const hasUserLiked = (postId) => {
    if (!currentUser) return false;
    return likes.some(
      (like) => like.userId === currentUser.id && like.postId === postId
    );
  };

  // 6. Find the like object for removal
  const getUserLikeId = (postId) => {
    if (!currentUser) return null;
    const foundLike = likes.find(
      (like) => like.userId === currentUser.id && like.postId === postId
    );
    return foundLike ? foundLike.id : null;
  };

  // 7. Handle like toggle
  const handleLikeToggle = async (e, postId) => {
    e.stopPropagation(); // Prevent navigation
    if (!currentUser) {
      alert("Please log in to like posts.");
      return;
    }

    try {
      // If user has already liked this post, remove the like
      if (hasUserLiked(postId)) {
        const likeId = getUserLikeId(postId);
        if (likeId) {
          await removeLike(likeId);
          // Update local state to remove the like
          setLikes((prev) => prev.filter((like) => like.id !== likeId));
        }
      } else {
        // Otherwise, add a new like
        const newLike = await addLike(postId, currentUser.id);
        // Add it to local state
        setLikes((prev) => [...prev, newLike]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // 8. Filter posts
  const filteredPosts = posts.filter((post) => {
    const topicMatch = !selectedTopic || post.topic?.name === selectedTopic;
    const searchMatch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return topicMatch && searchMatch;
  });

  // 9. Group posts by topic
  const postsByTopic = {};
  filteredPosts.forEach((post) => {
    const topicName = post.topic?.name || "General";
    if (!postsByTopic[topicName]) {
      postsByTopic[topicName] = [];
    }
    postsByTopic[topicName].push(post);
  });

  // 10. Unique topics
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

        {/* Grid layout by topic */}
        {uniqueTopics.length === 0 ? (
          <p className="text-slate-400 text-lg">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueTopics.map((topicName) => (
              <div key={topicName} className="flex flex-col">
                <h2
                  className="text-xl text-cyan-300 py-3 mb-4 border-b-2 border-cyan-500/30 text-center"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {topicName}
                </h2>

                <div className="space-y-8 flex-1">
                  {postsByTopic[topicName].map((post) => {
                    const userLiked = hasUserLiked(post.id);
                    return (
                      <div
                        key={post.id}
                        onClick={() => navigateToPost(post.id)}
                        className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg 
                                   shadow-lg p-6 border-2 border-cyan-500/20 hover:border-cyan-500/40 
                                   transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10
                                   cursor-pointer relative"
                      >
                        <h3
                          className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 
                                      transition-colors duration-300 mb-2"
                        >
                          {post.title}
                        </h3>
                        <p className="text-slate-300 mt-3 line-clamp-3">
                          {post.body}
                        </p>

                        {/* Actions bar */}
                        <div
                          className="mt-4 overflow-hidden transition-all duration-300 ease-in-out border-t border-cyan-500/30 pt-0 opacity-0 transform translate-y-2 
                                        group-hover:opacity-100 group-hover:translate-y-0 group-hover:pt-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-cyan-400 text-sm font-medium">
                              Actions
                            </span>
                            <button
                              onClick={(e) => handleLikeToggle(e, post.id)}
                              className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 text-sm 
                                        font-medium transition-all duration-200 hover:scale-105 flex items-center
                                        rounded-md"
                            >
                              {/* Conditionally render the icon based on 'userLiked' */}
                              {userLiked ? (
                                // Filled heart
                                <svg
                                  className="w-4 h-4 mr-1 text-purple-400"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 
                                    2 12.28 2 8.5 2 5.42 4.42 
                                    3 7.5 3c1.74 0 3.41.81 
                                    4.5 2.09A6.004 6.004 0 0116.5 
                                    3C19.58 3 22 5.42 22 
                                    8.5c0 3.78-3.4 6.86-8.55 
                                    11.54L12 21.35z"
                                  />
                                </svg>
                              ) : (
                                // Outline heart
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 
                                      000 6.364L12 20.364l7.682-7.682a4.5 
                                      4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 
                                      4.5 0 00-6.364 0z"
                                  />
                                </svg>
                              )}
                              Like
                            </button>
                          </div>
                        </div>
                        {/* End Actions */}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
