import React, { useLayoutEffect } from "react";
import "../css/Common.css";

import {Routes, Route, useNavigate} from 'react-router-dom';

import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

import YellowBin from "../images/yellow_bin.png";
import { Rectangle } from "@mui/icons-material";

const YellowBinResult = () => {
    
    useLayoutEffect(() => {
        document.body.style.background = "linear-gradient(90deg, #12261E, #1A4D39)"
    })
    const navigate = useNavigate();

  
    const navigateHome = () => {
      // 👇️ navigate to /
      navigate('/');
    };

    return (
        <div>
            <div>
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
                            This item is: <b>Recyclable</b>
                        </p>

                        <p className="text-result-left-regular">
                            To correctly dispose of this item, please put it in the <b>yellow bin.</b> 
                        </p>

                        </Grid>

                        <Grid item xs={4}>
                            <div className="result-bin-image-container-right"> 
                                <img src={YellowBin} alt="yellow-bin" className="result-bin-image-right"></img>
                                <div className="drop-shadow"/>
                            </div>
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

export default YellowBinResult;
