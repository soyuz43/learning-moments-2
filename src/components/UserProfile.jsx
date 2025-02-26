// src/components/UserProfile.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const UserProfile = ({ user, postCount, isCurrentUser, onEditProfile }) => {
  if (!user) {
    return <div>User profile not available.</div>;
  }

  return (
    <div>
      <h1>{ user.name}'s Profile</h1>
      <p>Cohort: {user.cohort}</p>
      <p>Posts Written: {postCount}</p>
      {isCurrentUser && (
        <button onClick={onEditProfile}>Edit Profile</button>
      )}
      {/* Additional user details can be added here */}
    </div>
  );
};
