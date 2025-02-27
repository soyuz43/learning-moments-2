// src/components/NavBarHandler.jsx
import { useNavigate } from "react-router-dom";

export const NavBarHandler = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("learning_user");
    navigate("/login", { replace: true });
  };

  const handleAllPosts = () => {
    // Dispatch a custom event to trigger filter reset in AllPostsHandler
    window.dispatchEvent(new CustomEvent("resetFilters"));
    navigate("/");
  };

  return {
    handleLogout,
    handleAllPosts,
    isLoggedIn: !!localStorage.getItem("learning_user"),
  };
};
