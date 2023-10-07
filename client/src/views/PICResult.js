import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PicCode1 from "../images/Symbol_Resin_Code_1_PETE.svg";
import PicCode2 from "../images/Symbol_Resin_Code_2_HDPE.svg";
import PicCode3 from "../images/Symbol_Resin_Code_3_V.svg";
import PicCode4 from "../images/Symbol_Resin_Code_4_LDPE.svg";
import PicCode5 from "../images/Symbol_Resin_Code_5_PP.svg";
import PicCode6 from "../images/Symbol_Resin_Code_6_PS.svg";
import PicCode7 from "../images/Symbol_Resin_Code_7_OTHER.svg";
import YellowBin from "../images/yellow_bin.png";
import RedBin from "../images/red_bin.png";

const PICResult = () => {
  return (
    <div>
      <div className="gradient_background">
        <div> 
            <div className="pic-background">
              <div>
                <Paper elevation={3} square={false} style={{ width: '100%'}}>
                  <div>
                  <Grid container>
                    <Grid item xs={2}>
                      <img src={PicCode1} alt="PIC_1" className="pic-image-container"></img>
                    </Grid>

                    <Grid item xs={10}>
                      <p className="pic-headings">Recycle!</p>
                    </Grid>

                    <Grid item xs={12}>
                      <hr/>
                    </Grid>
                  </Grid>
                  </div>
                  
                  <div>
                    <Grid container>
                      <Grid item xs={4}>
                        <p className="pic-text-result">
                          PET is commonly used to make water, soft drink and sport drink bottles, as well as condiment bottles and peanut butter and vegemite containers.
                        </p>
                      </Grid>

                      <Grid item xs={4}>
                        
                      </Grid>

                      <Grid item xs={4}>
                        <img src={YellowBin} alt="yellow-bin" className="bin-image-container"></img>
                      </Grid>

                    </Grid>
                  </div>

                  <div className="pic-scan-button-container">
                    <Button variant="contained" style={{height: "40px", backgroundColor: "#1A4D39"}}>Scan again</Button>
                  </div>
                </Paper>
              </div>
            </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PICResult;
