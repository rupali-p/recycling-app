/**
 * Upload Image page
 */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { displaySquareImage } from "../components/Camera";
import "../css/Common.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TopNav from "../components/TopNav";

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

  const Modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
    handleOpen();
  };

  return (
    <>
      <div className="gradient_background ">
        {/* <TopNav /> */}
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
              <div class="center" id="Upload Image Box">
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
                    sx={{
                      color: "white",
                    }}
                  >
                    <UploadFileIcon />
                    Upload file
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
              </div>
            </label>
          </div>

          {/*  post image selection modal  */}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ Modalstyle }}>
              <div className="center">
                <div>
                  {image ? (
                    <img src={`data:image/png;base64,${image}`} />
                  ) : (
                    <p>Continue with this image?</p>
                  )}
                </div>
                <canvas id={"image-preview"} />
              </div>

              <div className="center-lower">
                <Button
                  variant="contained"
                  size="extra large"
                  type="submit"
                  sx={{
                    backgroundColor: "white",
                    color: "Black",
                    "&:hover": {
                      backgroundColor: "green",
                      color: "white",
                    },
                  }}
                >
                  Continue
                </Button>
              </div>
            </Box>
          </Modal>
        </form>
      </div>
    </>
  );
};

export default UploadImage;
