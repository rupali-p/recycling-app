import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link to="/Login">Login</Link>
        <Link to="/SignUp">Sign Up</Link>
        <Link to="/ScanImage">Scan Image</Link>
        <Link to="/UploadImage">Upload Image</Link>
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
