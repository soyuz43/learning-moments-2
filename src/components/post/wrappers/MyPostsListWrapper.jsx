// src/components/post/wrappers/MyPostsListWrapper.jsx
import { useState, useEffect } from 'react';
import { getPostsByUserId } from '../../../services/postService';
import { MyPostsWrapper } from './MyPostsWrapper';

export const MyPostsListWrapper = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!currentUser) return;
      try {
        const data = await getPostsByUserId(currentUser.id);
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Error fetching your posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, [currentUser]);

  const handlePostDeleted = (postId) => {
    // Immediately remove the post from state without any animation.
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono">
        <div className="container mx-auto px-4 py-4 text-slate-100 text-center">
          <p className="text-cyan-300 text-lg">Loading your posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono">
        <div className="container mx-auto px-4 py-4 text-slate-100 text-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono">
        <div className="container mx-auto px-4 py-4 text-slate-100 text-center">
          <p className="text-slate-400 text-lg">You haven't written any posts yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen pt-20 font-mono">
      <div className="container mx-auto px-4 py-4 text-slate-100">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400 text-center">My Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {posts.map((post) => (
            <div key={post.id} className="relative overflow-visible w-full max-w-md">
              <MyPostsWrapper 
                post={post} 
                currentUser={currentUser} 
                onPostDeleted={handlePostDeleted}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
