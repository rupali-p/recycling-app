import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import moebius from "../images/moebius-loop.png";
import Button from "@mui/material/Button";
import { ArrowLeftIcon } from "@mui/x-date-pickers";

const Home = () => {
  return (
    <div>
      <div className="gradient_background">
        <div>
          <Grid container columns={2} sx={{ p: 5 }}>
            <Grid item xs={1}>
              <h>Hamlet.</h>
            </Grid>

            <Grid item xs={1} sx={{ p: 5, pt: 10 }}>
              <Box display="flex" justifyContent="flex-end">
                <MenuIcon style={{ color: "white" }} fontSize="large" />
              </Box>
            </Grid>
          </Grid>

          <div>
            <div className="descriptive-text">
              <p sx={{ p: 5 }}>
                In Australia, only 13% of all plastics are being recycled
                correctly.
                <br />
                We don't like that number.
                <br />
              </p>
              <p>
                <Button variant="contained" color="grey" sx={{ p: 2 }}>
                  Begin Scan
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
};

export default Home;
