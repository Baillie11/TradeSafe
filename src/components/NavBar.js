import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar({ onLogout }) {
  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
        <li><NavLink to="/transactions">Transactions</NavLink></li>
        <li><NavLink to="/fraud-settings">Fraud Settings</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><button onClick={onLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;
