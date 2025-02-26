// src/components/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Favorites = ({ favorites, onRemoveFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return <div>No favorite posts found.</div>;
  }

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <h2>
              <Link to={`/post/${fav.post.id}`}>{fav.post.title}</Link>
            </h2>
            <button onClick={() => onRemoveFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
