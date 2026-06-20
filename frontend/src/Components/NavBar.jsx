import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isLoggedIn, user, onLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        C2C Shop
      </Link>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pretraži proizvode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Pretraži</button>
      </div>
      <div className="nav-links">
        <div
          className={`user-avatar ${isLoggedIn ? "logged-in" : ""}`}
          onClick={toggleDropdown}
        >
          {isLoggedIn && (
            <span className="welcome-message">Zdravo, {user?.username}!</span>
          )}
          <span className="user-icon-unicode">👤</span>
        </div>

        {isOpen && (
          <div className="dropDown">
            {isLoggedIn ? (
              <ul>
                {user?.is_admin && (
                  <li>
                    <Link to="/admin">Admin Panel</Link>
                  </li>
                )}
                <li>
                  <Link to="/postavi-oglas">Postavi oglas</Link>
                </li>
                <li>
                  <Link to="/history">Istorija kupovine</Link>
                </li>
                <li>
                  <button onClick={onLogout}>Odjavi se</button>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login">Prijavi se</Link>
                </li>
                <li>
                  <Link to="/register">Registruj se</Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
