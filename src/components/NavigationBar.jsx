import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <NavLink className="navbar-brand" to="/">
          Movie App
        </NavLink>
      <div className="container">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "nav-link active text-decoration-underline" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/movies" 
                className={({ isActive }) => 
                  isActive ? "nav-link active text-decoration-underline" : "nav-link"
                }
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
             {/*
 <NavLink 
                to="/wishlist" 
                className={({ isActive }) => 
                  isActive ? "nav-link active text-decoration-underline" : "nav-link"
                }
              >
                Wishlist
              </NavLink>
              */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
