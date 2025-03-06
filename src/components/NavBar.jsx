// src/components/NavBar.jsx
import { useNavigate, Link } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("learning_user");

  const handleLogout = () => {
    localStorage.removeItem("learning_user");
    navigate("/login", { replace: true });
  };

  const handleAllPosts = () => {
    navigate("/", { state: { resetFilters: true }, replace: true });
  };

  return (
    <nav className="bg-gradient-to-r from-black via-purple-900 to-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Title */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={() =>
                navigate("/", { state: { resetFilters: true }, replace: true })
              }
              className="text-white text-2xl font-bold hover:text-gray-100 transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Learning Moments
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-8">
            <button
              onClick={handleAllPosts}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 border-b-2 border-transparent hover:border-white"
            >
              All Posts
            </button>

            {isLoggedIn && (
              <>
                <Link
                  to="/my-posts"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 border-b-2 border-transparent hover:border-white"
                >
                  My Posts
                </Link>

                <Link
                  to="/new-post"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 border-b-2 border-transparent hover:border-white"
                >
                  New Post
                </Link>

                <Link
                  to="/favorites"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 border-b-2 border-transparent hover:border-white"
                >
                  Favorites
                </Link>

                <Link
                  to="/edit-profile"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 border-b-2 border-transparent hover:border-white"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/my-comments"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 border-b-2 border-transparent hover:border-white"
                >
                  My Comments
                </Link>

                <button
                  onClick={handleLogout}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className="text-gray-100 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 border-b-2 border-transparent hover:border-white"
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
