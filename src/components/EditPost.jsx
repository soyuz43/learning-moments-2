// src/components/EditPost.jsx
import { useState } from 'react';

export const EditPost = ({ post, onSave }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [body, setBody] = useState(post ? post.body : '');
  const [topic, setTopic] = useState(post ? (post.topic?.name || post.topic) : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { ...post, title, body, topic };
    onSave(updatedPost);
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <br />
        <label>Body:</label>
        <textarea 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          required 
        />
        <br />
        <label>Topic:</label>
        <input 
          type="text" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
          required 
        />
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
