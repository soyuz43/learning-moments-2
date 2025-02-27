// src/components/AllPostsHandler.jsx
import { useState, useEffect } from "react";
import { getPosts, getTopics } from "../services/postService";
import { NavBar } from "./NavBar";

export const AllPostsHandler = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        const topicsData = await getTopics();
        setPosts(postsData);
        setTopics(topicsData || []);
      } catch (error) {
        console.error("Error fetching posts or topics:", error);
      }
    };
    fetchData();
  }, []);

  const handleTopicChange = (topic) => setSelectedTopic(topic);
  const handleSearchChange = (term) => setSearchTerm(term);
  const resetFilters = () => {
    setSelectedTopic("");
    setSearchTerm("");
  };

  const filteredPosts = posts.filter((post) => {
    const topicMatch = selectedTopic === "" || post.topic?.name === selectedTopic;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return topicMatch && searchMatch;
  });

  return {
    topics,
    filteredPosts,
    selectedTopic,
    searchTerm,
    handleTopicChange,
    handleSearchChange,
    resetFilters,
  };
};
