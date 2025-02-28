// src/components/NavBar.jsx

import { NavBarHandler } from "./NavBarHandler";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { handleLogout, handleAllPosts, isLoggedIn } = NavBarHandler();
  
  return (
    <nav className="bg-gradient-to-r from-black via-purple-900 to-purple-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Title */}
          <div className="flex-shrink-0">
            <h1 className="text-white font-medium text-xl">Learning Moments</h1>
          </div>
          
          {/* Nav Items */}
          <div className="flex items-center gap-8">
            {/* All Posts */}
            <button 
              onClick={handleAllPosts}
              className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-white"
            >
              All Posts
            </button>
            
            {isLoggedIn && (
              <>
                {/* My Posts */}
                <Link 
                  to="/my-posts"
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-white"
                >
                  My Posts
                </Link>
                
                {/* New Post */}
                <Link 
                  to="/new-post"
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-white"
                >
                  New Post
                </Link>
                
                {/* Logout */}
                <button 
                  onClick={handleLogout}
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};