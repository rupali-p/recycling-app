import React, { useState } from "react";

import '../css/Navbar.css'
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
        <Link to="/" className="title">
      <h>Hamlet.</h>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};