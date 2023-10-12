/**
 * Upload Image page
 */
import React, { useState } from "react";
import "../css/Common.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";

const TopNav = () => {
  const topNavStyle = {
    position: "absolute",
    top: "0",
    width: "100%",
    bgcolor: "red",
    boxShadow: 24,
  };

  return (
    <div>
      <Box component="span" sx={{ topNavStyle }}>
        <img src={"./images/Hamlet-logo.png"} alt={"Hamlet Logo"} />
        <Box display="fixed" justifyContent="flex-end">
          <MenuIcon style={{ color: "white" }} fontSize="large" />
        </Box>
      </Box>
    </div>
  );
};

export default TopNav;
