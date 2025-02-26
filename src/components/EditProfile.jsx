// src/components/EditProfile.jsx
import { useState } from 'react';

export const EditProfile = ({ user, onSaveProfile }) => {
  const [fullName, setFullName] = useState(user ?  user.name : '');
  const [cohort, setCohort] = useState(user ? user.cohort : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, fullName, cohort };
    onSaveProfile(updatedUser);
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input 
          type="text" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
          required 
        />
        <br />
        <label>Cohort:</label>
        <input 
          type="number" 
          value={cohort} 
          onChange={(e) => setCohort(e.target.value)} 
          required 
        />
        <br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};
