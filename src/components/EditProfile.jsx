// src/components/EditProfile.jsx
import { useState } from 'react';

export const EditProfile = ({ user, onSaveProfile }) => {
  const [fullName, setFullName] = useState(user ? user.name : '');
  const [cohort, setCohort] = useState(user ? user.cohort : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate cohort input: must be a non-negative number.
    const cohortNumber = parseInt(cohort, 10);
    if (isNaN(cohortNumber) || cohortNumber < 0) {
      setError('Cohort number must be a non-negative number.');
      return;
    }
    setError('');
    const updatedUser = { ...user, name: fullName, cohort: cohortNumber };
    // Example: Update the user in localStorage and invoke onSaveProfile callback.
    localStorage.setItem('learning_user', JSON.stringify(updatedUser));
    if (onSaveProfile) {
      onSaveProfile(updatedUser);
    }
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center font-mono">
      <div className="bg-slate-800 shadow-lg p-6 rounded-xl max-w-lg w-full">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-slate-200 font-medium block">Full Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              className="bg-slate-700 text-white px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="text-slate-200 font-medium block">Cohort</label>
            <input 
              type="number" 
              value={cohort} 
              onChange={(e) => {
                // Only allow non-negative numbers
                if (parseInt(e.target.value, 10) < 0) {
                  setCohort('0');
                } else {
                  setCohort(e.target.value);
                }
              }} 
              min="0"
              required 
              className="bg-slate-700 text-white px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded-lg font-medium transition-all hover:scale-105"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};
