import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography"

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

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
        <nav>
        <Grid container spacing={2}>
              <Grid item xs={8} md={10}>
                <Link to="/" className="title">
                  <Typography variant={"h1"}>Hamlet.</Typography>
                </Link>
              </Grid>
              <Grid item xs={4} md={2}>
                  <IconButton size="small">
                    <MenuRoundedIcon
                        sx={{p: 5, pr: 7, fontSize: 60, color: "White"}}
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
