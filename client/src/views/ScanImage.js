import React, { useState, useEffect } from "react";
import TakePicture from "../components/Camera";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FormControl, FormLabel } from "@mui/material";
//import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "../css/Common.css";
import "../css/scanning.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

const ScanImage = () => {
  const [image, setImage] = useState();
  const [inputImage, setInputImage] = useState();
  const [isImageFromFile, setIsImageFromFile] = useState(true);

  const UploadCapturedImage = async () => {
    await fetch("/api/upload-captured-photo", {
      method: "POST",
      body: JSON.stringify(inputImage),
    }).then((resp) => {
      resp.json().then((data) => {
        console.log(data);
        setImage(data.image);
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    if (isImageFromFile) {
      formData = new FormData(e.target);
      const Upload = async () => {
        await fetch("/api/upload", {
          method: "POST",
          body: formData,
        }).then((resp) => {
          resp.json().then((data) => {
            console.log(data);
            setImage(data.image);
          });
        });
      };
      Upload();
    } else {
      UploadCapturedImage();
      // formData = new FormData();
      // formData.append("image", inputImage)
    }
  };

  const handleSave = (imageDataUrl) => {
    console.log("Got image");
    // console.log(imageDataUrl)
    // const file = new File([imageBlob], "input_image",{ type: "image/png" })
    setInputImage(imageDataUrl);
    setIsImageFromFile(false);
  };

  return (
    <>
      <div className="gradient_background ">
        {/* This is where I want the image to go */}
        <a href="./" class="previous">
          &#8249;
        </a>
        <div id="LiveView">
          <React.Fragment>
            <CssBaseline />
            <Box
              sx={{
                bgcolor: "#cfe8fc",
                height: "80vh",
                position: "fixed",
                top: 50,
                left: 40,
                right: 40,
              }}
            />
          </React.Fragment>

          <Box
            sx={{
              height: 90,
              backgroundColor: "#969595",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <TakePicture handleSave={handleSave.bind(this)} />
          </Box>
        </div>
      </div>
    </>
  );
};

export default ScanImage;
