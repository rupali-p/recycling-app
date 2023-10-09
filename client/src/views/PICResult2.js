import * as React from "react";
import "../css/Common.css";

import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import PicCode2 from "../images/Symbol_Resin_Code_2_HDPE.svg";
import SoftPlastics from "../images/soft_plastics.png";
import HardPlastics from "../images/hard_plastics.png";

const PICResult2 = () => {
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
                        <img src={PicCode2} alt="PIC_2" className="pic-image-container"></img>
                      </Grid>

                      <Grid item xs={10}>
                        <p className="pic-headings">Is it a hard or soft plastic?</p>
                      </Grid>

                      <Grid item xs={12}>
                        <hr/>
                      </Grid>
                    </Grid>
                  </div>
                  
                  <div>
                    <Grid container>
                      <Grid item xs={4}>
                        <img src={HardPlastics} alt="hard_plastic" className="plastic-image-container-left"></img>
                        <p className="pic-text-result-left">
                          If the plastic is molded, tough or strong, it is a hard plastic. Hard plastic will dent or bounce back when scrunched! <b>Hard plastics</b> can be put into the <div className="pic-text-yellow">yellow recycling bin!</div>
                        </p>
                      </Grid>

                      <Grid item xs={4}>
                        <div className="pic-middle-divider"></div>
                      </Grid>

                      <Grid item xs={4}>
                        <img src={SoftPlastics} alt="soft_plastic" className="plastic-image-container-right"></img>
                        <p className="pic-text-result-right">
                          Soft plastics are mostly used for packaging food products. If the plastic is thin and flexible, it is a soft plastic. <b>Soft plastics</b> can be put into the <div className="pic-text-red">red landfill bin!</div>
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

export default PICResult2;
