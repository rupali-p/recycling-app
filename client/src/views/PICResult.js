import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import PicCode1 from "../images/Symbol_Resin_Code_1_PETE.svg";
import PicCode2 from "../images/Symbol_Resin_Code_2_HDPE.svg";
import PicCode3 from "../images/Symbol_Resin_Code_3_V.svg";
import PicCode4 from "../images/Symbol_Resin_Code_4_LDPE.svg";
import PicCode5 from "../images/Symbol_Resin_Code_5_PP.svg";
import PicCode6 from "../images/Symbol_Resin_Code_6_PS.svg";
import PicCode7 from "../images/Symbol_Resin_Code_7_OTHER.svg";

const PICResult = () => {
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
            
            <Box display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        my: 55,
                        mx: 40,
                        px: 30,
                        backgroundColor: "white"
            }}>
                
            </Box>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PICResult;
