// src/components/NavBarHandler.jsx
import { useNavigate } from "react-router-dom";

export const NavBarHandler = ({ onResetFilters }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("learning_user");
    navigate("/login", { replace: true });
  };

  const handleAllPosts = () => {
    if (onResetFilters) {
      onResetFilters();
    }
    navigate("/");
  };

  return {
    handleLogout,
    handleAllPosts,
    isLoggedIn: !!localStorage.getItem("learning_user"),
  };
};
