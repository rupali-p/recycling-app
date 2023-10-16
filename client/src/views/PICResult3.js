import * as React from "react";
import "../css/Common.css";

import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import PicCode3 from "../images/Symbol_Resin_Code_3_V.svg";
import SoftPlastics from "../images/soft_plastics.png";
import JuiceBottles from "../images/juice_bottles.png";

const PICResult3 = () => {
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
                        <img src={PicCode3} alt="PIC_3" className="pic-image-container"></img>
                      </Grid>

                      <Grid item xs={10}>
                        <p className="pic-headings">Recycle juice bottles!</p>
                      </Grid>

                      <Grid item xs={12}>
                        <hr/>
                      </Grid>
                    </Grid>
                  </div>
                  
                  <div>
                    <Grid container>
                      <Grid item xs={4}>
                        <img src={JuiceBottles} alt="juice_bottles" className="juice-image-container-left"></img>
                        <p className="pic-text-result-left">
                          Cordial and juice bottles can be recycled through your <div className="pic-text-yellow">yellow recycling bin!</div>
                        </p>
                      </Grid>

                      <Grid item xs={4}>
                        <div className="pic-middle-divider"></div>
                      </Grid>

                      <Grid item xs={4}>
                        <img src={SoftPlastics} alt="soft_plastic" className="plastic-image-container-right"></img>
                        <p className="pic-text-result-right">
                          <b>Toys, soft plastics, mats and flooring, etc</b> are to be put into the <div className="pic-text-red">red landfill bin!</div>
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

export default PICResult3;
