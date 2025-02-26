// components/AllPostsHandler.jsx
import   { useState, useEffect } from 'react';
import { getPosts, getTopics } from '../services/postService';

export const AllPostsHandler = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getTopics();
        setTopics(response);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    fetchTopics();
  }, []);

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredPosts = posts.filter((post) => {
    const topicMatch = selectedTopic === '' || post.topic.name === selectedTopic;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return topicMatch && searchMatch;
  });

  return {
    topics,
    posts: filteredPosts,
    selectedTopic,
    searchTerm,
    handleTopicChange,
    handleSearchChange,
  };
};