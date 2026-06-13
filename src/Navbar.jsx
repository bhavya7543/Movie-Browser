import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import 'animate.css';

function Navbar({ query, onSearch, isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <h1>
        <i className="bi bi-film title-icon"></i>
        <label className="title-label animate__animated"> Movie Browser</label>
      </h1>
      
      <Searchbar query={query} onSearch={onSearch} />
      {/* <h5 className="animate__animated  animate__bounce">Search Movies</h5> */}
      <ul className="nav-links">
        <li><Link to="/favourites">Favourites</Link></li>

        <li>
          {isLoggedIn ? (
            <button onClick={onLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;