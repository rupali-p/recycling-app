import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Navbar } from "../components/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const BeginScan = () => {
  function handleClickUpload(e) {
    e.preventDefault();
    document.getElementById("myNav").style.width = "100%";
    console.log("The link has been  clicked.");
  }

  return (
    <div>
      <div className="gradient_background">
        <Navbar />
        <Grid container columns={2}>
          <Grid item xs={1}>
            <Box sx={{ pl: 10, pr: 10, pt: 3 }}>
              <Card sx={{ width: "100%" }}>
                <CardActionArea href="/ScanImage" sx={{ textAlign: "center" }}>
                  <CameraAltIcon
                    sx={{fontSize: 300, color: "Grey" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Take Photo
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={1}>
            <Box sx={{ pl: 10, pr: 10, pt: 3 }}>
              <Card sx={{ width: "100%", height: "100%" }}>
                <CardActionArea
                  href="/UploadImage"
                  sx={{ textAlign: "center" }}
                >
                  <FileUploadIcon
                    sx={{fontSize: 300, color: "Grey" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Upload Image
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default BeginScan;
