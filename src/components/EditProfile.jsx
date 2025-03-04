// src/components/EditProfile.jsx
import { useState } from 'react';

export const EditProfile = ({ user, onSaveProfile }) => {
  const [fullName, setFullName] = useState(user ? user.name : '');
  const [cohort, setCohort] = useState(user ? user.cohort : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, fullName, cohort };
    onSaveProfile(updatedUser);
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
              onChange={(e) => setCohort(e.target.value)} 
              required 
              className="bg-slate-700 text-white px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            />
          </div>
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
