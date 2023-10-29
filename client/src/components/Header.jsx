import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="Header">
      <div className="logo">
        <h1>Budget Planner</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/home">Home</Link></li>
          <li className="nav-item"><Link to="/home/transactions">Transactions</Link></li>
          <li className="nav-item"><Link to="/home/categories">Categories</Link></li>
          <li className="nav-item"><Link to="/">Account</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;