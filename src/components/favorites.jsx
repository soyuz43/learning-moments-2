// src/components/Favorites.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostById } from '../services/postService';
import { removeLike, getLikesForUser } from '../services/engagementService';

export const Favorites = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]); // Each item: { likeId, post }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser) return;
      try {
        // Use the offloaded API call to fetch likes for this user.
        const likesData = await getLikesForUser(currentUser.id);
        // For each like, fetch the corresponding post.
        const favoritePromises = likesData.map(async (like) => {
          const post = await getPostById(like.postId);
          return { likeId: like.id, post };
        });
        const favoritesWithPosts = await Promise.all(favoritePromises);
        setFavorites(favoritesWithPosts);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  const handleRemoveFavorite = async (likeId) => {
    try {
      await removeLike(likeId);
      setFavorites((prev) => prev.filter((fav) => fav.likeId !== likeId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
        <p>Please log in to view your favorites.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
        <p>Loading favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen pt-20 font-mono text-white">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">Your Favorites</h1>
        {favorites.length === 0 ? (
          <p>You have not favorited any posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map(({ likeId, post }) => (
              <li
                key={likeId}
                className="flex items-center justify-between bg-slate-800 p-4 rounded-md"
              >
                <button 
                  onClick={() => navigate(`/post/${post.id}`, { state: { post } })}
                  className="text-xl font-semibold text-cyan-400 hover:underline"
                >
                  {post.title}
                </button>
                <button
                  onClick={() => handleRemoveFavorite(likeId)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-all duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
