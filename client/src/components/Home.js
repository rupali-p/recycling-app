import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from '@mui/material/Box';
import moebius from '../images/moebius-loop.png'
import Button from '@mui/material/Button';

const Home = () => {
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
                <MenuIcon style={{ color: "white"}} fontSize="large"/>
              </Box>
            </Grid>
          </Grid>

          <div>
            

            <div className="descriptive-text">
              <p>
              In Australia, only 13% of all plastics are being recycled correctly<br />We don't like that number.<br />
              <Button variant="contained">Contained</Button>
              </p>
              
            </div>

            <div className="moebius-image-container">
              <img src={moebius} alt="Moebius Loop" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;
