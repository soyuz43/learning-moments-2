// src/components/NavBar.jsx
import { NavBarHandler } from "./NavBarHandler";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { handleLogout, handleAllPosts, isLoggedIn } = NavBarHandler();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md px-6 flex items-center justify-center z-50">
      <ul className="flex gap-6 text-white font-medium text-lg">
        <li className="group">
          <button
            onClick={handleAllPosts}
            className="px-6 py-2 rounded-lg transition transform hover:scale-105 hover:text-indigo-400 group-hover:brightness-75"
          >
            All Posts
          </button>
        </li>
        {isLoggedIn && (
          <>
            <li className="group">
              <Link
                to="/my-posts"
                className="px-6 py-2 rounded-lg transition transform hover:scale-105 hover:text-indigo-400 group-hover:brightness-75"
              >
                My Posts
              </Link>
            </li>
            <li className="group">
              <Link
                to="/new-post"
                className="px-6 py-2 rounded-lg transition transform hover:scale-105 hover:text-green-400 group-hover:brightness-75"
              >
                New Post
              </Link>
            </li>
            <li className="group">
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg transition transform hover:scale-105 hover:text-red-400 group-hover:brightness-75"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
