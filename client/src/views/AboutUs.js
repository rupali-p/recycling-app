import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import moebius from "../images/moebius-loop.png";
import Button from "@mui/material/Button";
import { Navbar } from "../components/Navbar";

import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
      <div className="gradient_background">
        <Navbar />
        <a>Chuck some about us-y stuff here xx</a>
      </div>
    </div>
  );
};

export default AboutUs;
