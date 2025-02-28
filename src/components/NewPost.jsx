// src/components/NewPost.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics, createPost } from "../services/postService";

export const NewPost = ({ currentUser }) => {
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const newPost = {
      title,
      body,
      userId: currentUser.id,
      topicId: parseInt(topicId),
      date: new Date().toISOString().slice(0, 10) // e.g. "2025-02-27"
    };

    try {
      await createPost(newPost);
      navigate("/my-posts");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 mb-6">
        Create a New Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-6 w-full max-w-xl border border-gray-700"
      >
        <label className="block text-gray-400 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block text-gray-400 mb-2">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block text-gray-400 mb-2">Topic</label>
        <select
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          required
          className="w-full mb-6 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          Save
        </button>
      </form>
    </div>
  );
};
