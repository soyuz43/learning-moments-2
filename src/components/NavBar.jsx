// src/components/NavBar.jsx
import { Link, useNavigate } from "react-router-dom";
import { NavBarHandler } from "./NavBarHandler";

export const NavBar = ({ resetDropdown }) => {
  const { handleLogout, isLoggedIn } = NavBarHandler();
  const navigate = useNavigate();

  const handleNavClick = () => {
    resetDropdown?.(); // Reset dropdown state if function is passed
    navigate("/"); // Ensure navigation occurs
  };

  return (
    <ul>
      <li>
        <button onClick={handleNavClick}>All Posts</button>
      </li>
      {isLoggedIn ? (
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      ) : null}
    </ul>
  );
};
