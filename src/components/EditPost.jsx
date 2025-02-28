// src/components/EditPost.jsx
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPostById, updatePost, getTopics } from "../services/postService"

export const EditPost = ({ currentUser }) => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState({
    title: "",
    body: "",
    topicId: "",
  })
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(postId)
        setPost(fetchedPost)
      } catch (error) {
        console.error("Error fetching post:", error)
      }
    }
    fetchPost()
  }, [postId])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getTopics()
        setTopics(topicsData)
      } catch (error) {
        console.error("Error fetching topics:", error)
      }
    }
    fetchTopics()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentUser) return

    // Ensure topicId is an integer if using a dropdown
    const updatedPost = {
      ...post,
      topicId: parseInt(post.topicId),
    }

    try {
      await updatePost(postId, updatedPost)
      navigate("/my-posts")
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  if (!post) return <p>Loading post...</p>

  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-100 mb-6">Edit Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-6 w-full max-w-xl border border-gray-700"
      >
        <label className="block text-gray-400 mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block text-gray-400 mb-2">Body</label>
        <textarea
          name="body"
          value={post.body}
          onChange={handleChange}
          required
          rows={4}
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block text-gray-400 mb-2">Topic</label>
        <select
          name="topicId"
          value={post.topicId}
          onChange={handleChange}
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
  )
}
