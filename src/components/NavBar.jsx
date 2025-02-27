// src/components/NavBar.jsx
import { NavBarHandler } from "./NavBarHandler";

export const NavBar = (props) => {
  // Parent can pass onResetFilters to reset dropdown/search filters
  const { onResetFilters } = props;
  const { handleLogout, handleAllPosts, isLoggedIn } = NavBarHandler({ onResetFilters });

  return (
    <ul>
      <li>
        <button onClick={handleAllPosts}>All Posts</button>
      </li>
      {isLoggedIn && (
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      )}
    </ul>
  );
};
