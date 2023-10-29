import React, { useState, useEffect, useLayoutEffect } from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import moebius from "../images/moebius-loop.png";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const Home = () => {

  useLayoutEffect(() => {
    document.body.style.background = "linear-gradient(90deg, #12261E, #1A4D39)"
  })
  
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

  function handleClick(e) {
    console.log("button clicked");
    console.log("username is now " + localStorage.getItem("userName"));
  }

  if (windowWidth >= 1024) { // Laptop size
    return (
      <div>
        <div className="gradient_background">
          <Navbar />
          <div>
            <div>
              <div className="descriptive-text">
                <p sx={{ p: 5 }}>
                  Currently, only 13% of plastics in Australia are being recycled correctly.
                  <br />
                  You can do better than that.
                  <br />
                </p>
                <p>
                  <Button variant="contained" color="grey" sx={{
                    backgroundColor: "white",
                    color: "Black",
                    marginRight: 2,
                    "&:hover": {
                      backgroundColor: "grey",
                      color: "white",
                    },
                  }} href={"./ScanImage"}>
                    Live Scan
                  </Button>
                  <Button variant="contained" color="grey" sx={{
                    backgroundColor: "white",
                    color: "Black",
                    marginRight: 2,
                    "&:hover": {
                      backgroundColor: "grey",
                      color: "white",
                    },
                  }} href={"./UploadImage"}>
                    Upload Scan
                  </Button>
                </p>
              </div>

              <div className="moebius-image-container">
                <img
                  src={moebius}
                  alt="Moebius Loop"
                  style={{ paddingTop: 15 }}
                />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    )
  } else {
    return (
      <Grid className="gradient_background">
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid className="gradient_background" item xs={12} sm={8} md={5} elevation={6} square>
          <Navbar />
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ textAlign: 'center', mb: 3 }}>
                Currently, only 13% of plastics in Australia are being recycled correctly.
                <br />
                You can do better than that.
                <br />
              </Typography>
              <Button variant="contained" color="grey" sx={{ p: 2, color: 'white' }} href={"./ScanImage"}>
                Live Scan
              </Button>
              <Button variant="contained" color="grey" sx={{ p: 2, color: 'white' }} href={"./UploadImage"}>
                Upload Scan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default Home;