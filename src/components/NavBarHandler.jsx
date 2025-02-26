// src/components/NavBarHandler.jsx

import { useNavigate } from "react-router-dom";

export const NavBarHandler = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("learning_user");
    navigate("/login", { replace: true });
  };

  return {
    handleLogout,
    isLoggedIn: !!localStorage.getItem("learning_user"),
  };
};