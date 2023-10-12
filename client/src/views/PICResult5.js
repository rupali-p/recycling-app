import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PicCode5 from "../images/Symbol_Resin_Code_5_PP.svg";
import YellowBin from "../images/yellow_bin.png";

const PICResult5 = () => {
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
                        <img src={PicCode5} alt="PIC_5" className="pic-image-container"></img>
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
                        <p className="pic-text-result-left-only">
                          PP is commonly used to make ice cream containers and lids, yoghurt, margarine and butter tubs, juice bottles, bottle caps, straws, plant pots and plastic takeaway containers.
                        </p>
                      </Grid>

                      <Grid item xs={4}>
                        
                      </Grid>

                      <Grid item xs={4}>
                        <img src={YellowBin} alt="yellow-bin" className="bin-image-container-right"></img>
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

export default PICResult5;
