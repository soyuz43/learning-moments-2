// src/components/NavBar.jsx

import { Link } from "react-router-dom";
import { NavBarHandler } from "./NavBarHandler";

export const NavBar = () => {
  const { handleLogout, isLoggedIn } = NavBarHandler();

  return (
    <ul>
      <li>
        <Link to="/">All Posts</Link>
      </li>
      {isLoggedIn ? (
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};