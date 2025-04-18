import { Link } from "react-router-dom";
import "../css/NavBar.css";
import { MdHome, MdFavorite } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link-with-icon">
          <MdHome className="navbar-icon" />
          Home
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/home" className="nav-link-with-icon">
          <FaSearch className="navbar-icon" />
          Search
        </Link>
        <Link to="/favorites" className="nav-link-with-icon">
          <MdFavorite className="navbar-icon" />
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
