import React, {useLayoutEffect} from "react";
import "../css/Common.css";

import {useNavigate} from 'react-router-dom';

import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import YellowBin from "../images/yellow_bin.png";

import {Navbar} from "../components/Navbar";
import {Divider, Typography} from "@mui/material";

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
        <>
            <Navbar/>

            <Grid container spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} align={"center"}>
                        <Grid item xs={12}>
                            <Grid item xs={12} align={"center"}>
                                <Grid item xs={8} align={"left"}>
                                    <Grid item xs={12} mb={5} mt={5}>
                                        <Typography variant={"h3"} style={{color: "white"}}>
                                            Result
                                        </Typography>
                                        <Divider component="li" sx={{
                                            listStyleType: "none",
                                            borderColor: 'white',
                                            borderBottomWidth: 4
                                        }}/>
                                    </Grid>
                                    <Grid item xs={12} mb={5}>
                                        <Typography variant={"h4"} style={{color: "white"}}>
                                            This item is:
                                        </Typography>
                                        <Typography variant={"h4"} style={{color: "white"}}>
                                            <strong>
                                                Recyclable
                                            </strong>
                                        </Typography>

                                    </Grid>

                                    <Typography variant={"h6"} style={{color: "white"}}>
                                        To correctly dispose of this item, please put it in the <strong>yellow
                                        bin.</strong>
                                    </Typography>

                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container xs={12} md={6} align={"center"}>
                            <Grid item xs={12} md={12} align={"center"}>
                                <Grid item xs={6} md={12}>
                                    <img src={YellowBin} alt="yellow-bin" width={"100%"}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} align={"center"} mt={-10}>
                                <div className="drop-shadow"/>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} align={"center"} mt={7}>
                    <Button onClick={navigateHome} variant="contained"
                            style={{height: "40px", width: "250px", color: "black", backgroundColor: "white"}}>Scan
                        again
                    </Button>
                </Grid>

            </Grid>

        </>
    );
};

export default YellowBinResult;
