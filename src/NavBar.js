import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="navbar-item" to="/books">
          Номууд
        </Link>
        <a className="navbar-item" onClick={onLogout}>
          Гарах
        </a>
      </div>
    </nav>
  );
}
