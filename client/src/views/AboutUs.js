import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import moebius from "../images/moebius-loop.png";
import Button from "@mui/material/Button";
import { Navbar } from "../components/Navbar";

import { Link } from "react-router-dom";

const BeginScan = () => {
  return (
    <div>
      <div className="gradient_background">
        <Navbar />
        <div className="bodyWrapper">
          <div className="descriptive-text">
            <p sx={{ p: 5 }}>
              THIS IS ACTUALLY ABOUT US HAHAHAHA
              <br />
              You can do better than that.
              <br />
            </p>
            <p>
              <Button
                variant="contained"
                color="grey"
                sx={{ p: 2 }}
                href={"./ScanImage"}
              >
                Live Scan
              </Button>
              <Button
                variant="contained"
                color="grey"
                sx={{ p: 2 }}
                href={"./UploadImage"}
              >
                Upload Scan
              </Button>
              <Button variant="contained" color="grey" sx={{ p: 2 }}>
                <Link to="/Login">Login</Link>
              </Button>
              <Button variant="contained" color="grey" sx={{ p: 2 }}>
                <Link to="/SignUp">Sign Up</Link>
              </Button>
              <Button variant="contained" color="grey" sx={{ p: 2 }}>
                <Link to="/Login">Login</Link>
              </Button>
              <Button variant="contained" color="grey" sx={{ p: 2 }}>
                <Link to="/Account">Account</Link>
              </Button>
            </p>
          </div>

          <div className="moebius-image-container">
            <img src={moebius} alt="Moebius Loop" style={{ paddingTop: 15 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginScan;
