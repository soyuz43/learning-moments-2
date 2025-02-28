// src/components/EditPost.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopics, getPostById, updatePost } from "../../services/postService";

export const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPost = await getPostById(postId);
        const fetchedTopics = await getTopics();

        setPost(fetchedPost);
        setTopics(fetchedTopics);
        setSelectedTopic(fetchedPost.topicId);
      } catch (error) {
        console.error("Error fetching post or topics:", error);
      }
    };
    fetchData();
  }, [postId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!post || !selectedTopic) return;

    const updatedPost = { ...post, topicId: selectedTopic };
    await updatePost(postId, updatedPost);
    navigate("/my-posts");
  };

  if (!post) return <div className="text-slate-400">Loading...</div>;

  return (
    <div className="bg-slate-900 min-h-screen pt-20 text-slate-100 flex flex-col items-center px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
      <form onSubmit={handleSave} className="bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-xl border border-slate-700">
        <label className="block text-slate-300 text-lg font-medium">Title</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full bg-slate-700 text-slate-200 px-4 py-2 rounded-md mt-1 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          required
        />

        <label className="block text-slate-300 text-lg font-medium mt-4">Body</label>
        <textarea
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          className="w-full bg-slate-700 text-slate-200 px-4 py-2 rounded-md mt-1 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none h-32 resize-none"
          required
        />

        <label className="block text-slate-300 text-lg font-medium mt-4">Select Topic</label>
        <div className="flex flex-col gap-2 mt-2">
          {topics.map((topic) => (
            <label key={topic.id} className="flex items-center gap-2 text-slate-300">
              <input
                type="radio"
                name="topic"
                value={topic.id}
                checked={selectedTopic === topic.id}
                onChange={(e) => setSelectedTopic(Number(e.target.value))}
                className="accent-cyan-500"
              />
              {topic.name}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md mt-6 transition font-medium w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
