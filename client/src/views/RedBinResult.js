import * as React from "react";
import "../css/Common.css";

import {Routes, Route, useNavigate} from 'react-router-dom';

import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

import RedBin from "../images/red_bin.png";
import { Rectangle } from "@mui/icons-material";

const RedBinResult = () => {
    const navigate = useNavigate();

  
    const navigateHome = () => {
      // 👇️ navigate to /
      navigate('/');
    };

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
                </div>
                <div>
                    <Grid container>
                        <Grid item xs={4}>
                        <h2>
                            Result
                        </h2>

                        <hr/>

                        <p className="text-result-left-larger">
                            This item is: <b>Not Recyclable</b>
                        </p>

                        <p className="text-result-left-regular">
                            To correctly dispose of this item, please put it in the <b>red bin.</b> 
                        </p>

                        </Grid>

                        <Grid item xs={4}>
                            <img src={RedBin} alt="red-bin" className="result-bin-image-container-right"></img>
                            <div className="drop-shadow"/>
                        </Grid>

                    </Grid>
                </div>
                    
                <div className="scan-button-container">
                    <Button onClick={navigateHome} variant="contained" style={{height: "40px", width:"250px", color: "black", backgroundColor: "white"}}>Scan again</Button>
                </div>
            </div> 
        </div> 
    );
};

export default RedBinResult;