import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const username = localStorage.getItem("userName");

  function handleOpenNav(e) {
    e.preventDefault();
    document.getElementById("myNav").style.width = "100%";
    console.log("The link has been  clicked.");
  }

  function handleCloseNav(e) {
    e.preventDefault();
    document.getElementById("myNav").style.width = "0%";
    console.log("The link has been  clicked.");
  }

  return (
    <nav>
      <div id="myNav" class="overlay">
        {/* <!-- Button to close the overlay navigation --> */}
        <a href="javascript:void(0)" class="closebtn" onClick={handleCloseNav}>
          &times;
        </a>

        {/* <!-- Overlay content --> */}
        <div class="overlay-content">
          <Link to="/">Home</Link>
          {username ? <Link to="/Account">Account</Link> : null}
          <Link to="/AboutUs">About Us</Link>
          <Link to="/Resources">Resources</Link>
          <Link to="/BeginScan">Begin Scan</Link>
          {username ? null : (
            <>
              <Link to="/Login">Login</Link>
              <Link to="/SignUp">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <Link to="/" className="title">
        <h>Hamlet.</h>
      </Link>
      <div className="iconContainer">
        {/* <MenuRoundedIcon sx={{ p: 5, pr: 7, fontSize: 60 }}/> */}
        <IconButton size="small">
          <MenuRoundedIcon
            sx={{ p: 5, pr: 7, fontSize: 60, color: "White" }}
            onClick={handleOpenNav}
          />
        </IconButton>
      </div>
    </nav>
  );
};
