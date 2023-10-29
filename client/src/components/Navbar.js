import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography"

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import hamlet from "../images/hamlet-logo-white.png";

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
      <ThemeProvider theme={theme}>
        <nav sx={{padding: '2%'}}>
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
            <div id="myNav" className="overlay">
              {/* <!-- Button to close the overlay navigation --> */}
              <a href="javascript:void(0)" className="closebtn" onClick={handleCloseNav}>
                &times;
              </a>

              {/* <!-- Overlay content --> */}
              <div className="overlay-content">
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


        </Grid>
        </nav>
      </ThemeProvider>
  );
};
