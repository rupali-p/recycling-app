import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button } from "@mui/material";

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import hamlet from "../images/hamlet-logo-white.png";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  
  if (windowWidth >= 1024) {
    return (
      <nav>
      <div id="myNav" class="overlay">
        {/* <!-- Button to close the overlay navigation --> */}
        <a href="javascript:void(0)" class="closebtn" onClick={handleCloseNav}>
          &times; 
        </a>

        <Grid container spacing={2}>
              <Grid item xs={8} md={10}>
                <Link to="/" className="title">
                  <img src={hamlet} alt={"Hamlet"} sx={{
                    width: '10%', 
                    height: "3%" }}/>
                </Link>
              </Grid>
              <Grid item xs={4} md={2} mt={4}>
                  <IconButton>
                    <MenuRoundedIcon
                        sx={{fontSize: 60, color: "White"}}
                        onClick={handleOpenNav}
                    />
                  </IconButton>
                  </Grid>
              </Grid>
            <div id="myNav" className="overlay">
              {/* <!-- Button to close the overlay navigation --> */}
              <a href="javascript:void(0)" className="closebtn" onClick={handleCloseNav}>
                &times;
              </a>
        {/* <!-- Overlay content --> */}
        <div class="overlay-content">
          <Link to="/">Home</Link>
          {username ? <Link to="/Account">Account</Link> : null}
          <Link to="/ScanImage">Scan Image</Link>
          <Link to="/UploadImage">Upload Image</Link>
          {username ? null : (
            <>
              <Link to="/Login">Login</Link>
              <Link to="/SignUp">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <Link to="/" className="title" sx={{maxWidth: '10px'}}>
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
      </div>
    </nav>
    )
  }
  else {
    return(
      <nav style={{minWidth: '20%'}}>
      <div id="myNav" class="overlay">
        {/* <!-- Button to close the overlay navigation --> */}
        <a href="javascript:void(0)" class="closebtn" onClick={handleCloseNav}>
          &times; 
        </a>

        {/* <!-- Overlay content --> */}
        <div class="overlay-content">
          <Link to="/">Home</Link>
          {username ? <Link to="/Account">Account</Link> : null}
          <Link to="/ScanImage">Scan Image</Link>
          <Link to="/UploadImage">Upload Image</Link>
          {username ? null : (
            <>
              <Link to="/Login">Login</Link>
              <Link to="/SignUp">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <Link to="/" className="title">
        <h2 style={{marginLeft: '-30px'}}>Hamlet.</h2>
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
    )
  }
};