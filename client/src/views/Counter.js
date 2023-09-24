import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

const Counter = () => {
    return (
        <div>
        <div className="gradient_background">
        <div>
            <Grid container columns={2} sx={{ p: 5 }}>
            <Grid item xs={1}>
                <h>Hamlet.</h>
            </Grid>

            <Grid item xs={1} sx={{ p: 5}}>
                <Box display="flex" justifyContent="flex-end">
                <MenuIcon style={{ color: "white" }} fontSize="large" />
                </Box>
            </Grid>
            </Grid>

            <div>
                <div className="section-left">
                    <h1>
                    You've scanned
                    </h1>

                    <br />

                    <p style={{display: 'inline-block'}}>
                        <strong className="number-of-scans">27</strong> items
                    </p>

                    <br />

                    <p>
                        <strong>Did you know</strong> that’s enough plastic to make
                    </p>
                    <p>
                        exactly 3.52 Kardashians?
                    </p>
                </div>

                <div className="section-right">
                    <h1>
                        Scan History
                    </h1>
                </div>
            </div>

        </div>
        </div>
        <div></div>
    </div>
    );
};

export default Counter;