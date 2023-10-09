import * as React from "react";
import "../css/Common.css";

import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import PicCode7 from "../images/Symbol_Resin_Code_7_OTHER.svg";
import MiscPlastics from "../images/misc_plastics.jpg";
import PlaPlastics from "../images/pla_plastics.jpg";

const PICResult7 = () => {
  return (
    <div>
      <div className="gradient_background">
        <div> 
            <div className="pic-background">
              <div>
                <Paper elevation={3} square={false} style={{ width: '1200px'}}>
                  <div>
                    <Grid container>
                      <Grid item xs={2}>
                        <img src={PicCode7} alt="PIC_7" className="pic-image-container"></img>
                      </Grid>

                      <Grid item xs={10}>
                        <p className="pic-headings">DO NOT RECYCLE! ❌</p>
                      </Grid>

                      <Grid item xs={12}>
                        <hr/>
                      </Grid>
                    </Grid>
                  </div>
                  
                  <div>
                    <Grid container>
                      <Grid item xs={4}>
                        <img src={PlaPlastics} alt="pla_plastics" className="juice-image-container-left"></img>
                        <p className="pic-text-result-left">
                          PLA Plastics cannot be reycled but are 100% biodegradable and can be used for home <div className="pic-text-green">composting!</div> Otherwise, put into <div className="pic-text-red">red landfill bin.</div>
                        </p>
                      </Grid>

                      <Grid item xs={4}>
                        <div className="pic-middle-divider"></div>
                      </Grid>

                      <Grid item xs={4}>
                        <img src={MiscPlastics} alt="misc_plastic" className="plastic-image-container-right"></img>
                        <p className="pic-text-result-right">
                        All other items should go into the <div className="pic-text-red">red landfill bin.</div>
                        </p>
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

export default PICResult7;
