/**
 * Upload Image page
 */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { displaySquareImage } from "../components/Camera";
import "../css/Common.css";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const UploadImage = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [image, setImage] = useState();
  const [inputImage, setInputImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(inputImage),
    }).then((resp) => {
      resp.json().then((data) => {
        setImage(data.image);
      });
    });
  };

  const handleUploadFile = async (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageFile = new Image();
      imageFile.src = reader.result;
      imageFile.onload = () => {
        const canvas = displaySquareImage(
          imageFile,
          imageFile.width,
          imageFile.height
        );
        setInputImage(canvas.toDataURL().split(";base64,")[1]);
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <div className="gradient_background ">
        <Box
          sx={{
            height: 90,
            backgroundColor: "#969595",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
          }}
        ></Box>
        <canvas id={"image-preview"} />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-group">
            <input
              type="file"
              id="image"
              name="file"
              accept="image/*"
              className="file-custom"
              hidden="true"
              onChange={handleUploadFile}
            />
            <label htmlFor="image">
              <div class="center">
                <Box
                  component="span"
                  sx={{
                    p: 25,
                    border: "10px dashed white",
                    backgroundColor: "grey",
                    opacity: [0.7, 0.6, 0.4],
                    borderRadius: "16px",
                    "&:hover": {
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Button
                    component="label"
                    variant="text"
                    size="large"
                    colour="info"
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>

                {/* Something for later, I want the image selected to pop-up in a modal */}
                {/* <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  </Box>
                </Modal> */}
              </div>
            </label>
          </div>

          <div className="center-lower">
            <Button variant="contained" size="large" type="submit">
              Identify
            </Button>
          </div>
          {/* <div>
            {image ? (
              <img src={`data:image/png;base64,${image}`} />
            ) : (
              <p>This is where the results image will go.</p>
            )}
          </div> */}
        </form>
      </div>
    </>
  );
};

export default UploadImage;
