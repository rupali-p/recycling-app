import React, { useState, useEffect,useLayoutEffect } from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import moebius from "../images/moebius-loop.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// Extra imports for placeholder mobile UI
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Home = () => {
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

  if (windowWidth >= 1024) { // Laptop size
    return (
      <div>
        <div className="gradient_background">
          <div>
            <Grid container columns={2} sx={{ p: 5 }}>
              <Grid item xs={1}>
                <h>Hamlet.</h>
              </Grid>

              <Grid item xs={1} sx={{ p: 5 }}>
                <Box display="flex" justifyContent="flex-end">
                  <MenuIcon style={{ color: "white" }} fontSize="large" />
                </Box>
              </Grid>
            </Grid>

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
    );
  } else { // Phone size
    return (
      <Grid className="gradient_background">
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid className="gradient_background" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h2" style={{ marginBottom: '20px', color: 'white' }}>
                Hamlet.
              </Typography>
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