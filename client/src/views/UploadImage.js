/**
 * Upload Image page
 */
import React, {useLayoutEffect, useState} from "react";
import { displaySquareImage } from "../components/Camera";
import "../css/Common.css";
import { styled, withStyles } from "@mui/material/styles";
import {
  Button,
  Grid,
  Box,
  Modal,
  Typography,
    Divider,
    List,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TopNav from "../components/TopNav";
import { PIC_MAPPING } from "../const";


const getDetectionsInfo = (detections) => {
  const detectionsArray = JSON.parse(detections)
  const info = []
  detectionsArray.forEach((detection) => {
    info.push(PIC_MAPPING[detection.class_label])
  })
  return info
}

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
  const [detections, setDetections] = useState();

  const handleSubmit = async (e) => {
    console.log("Submitting")
    e.preventDefault();
    await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(inputImage),
    }).then((resp) => {
      resp.json().then((data) => {
        setImage(data.image);
        const detectionsInfo = getDetectionsInfo(data.detections)
        setDetections(detectionsInfo)
        console.log(detectionsInfo)

      });
    });
    setOpen(false)
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
          imageFile.height,
            "image-preview"
        );
        setInputImage(canvas.toDataURL().split(";base64,")[1]);
      };
    };
    reader.readAsDataURL(event.target.files[0]);
    handleOpen();
  };
  function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

  const rows = [
      createData("PP", 0.97),
    createData("HDPE", 0.91),
    createData("Other", 0.67),
];

  useLayoutEffect(() => {
    document.body.style.background = "linear-gradient(90deg, #12261E, #1A4D39)"
  })

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} m={5}>
          <h>Hamlet.</h>
        </Grid>
          {/* <TopNav /> */}
        {
          !image ? (
              <Grid item xs={12}>
                <form onSubmit={handleSubmit} encType="multipart/form-data" id={"imageUpload"}>
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
                      <div className="center" id="Upload Image Box">
                        <Box
                            component="span"
                            p={{xs: 10, md:25}}
                            sx={{
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
                            <UploadFileIcon/>
                            Upload file
                            <VisuallyHiddenInput type="file"/>
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
                      scrollabe={false}
                  >
                    <Box sx={{Modalstyle}}>
                      <div className="center">
                        <canvas id={"image-preview"}/>
                      </div>

                      <div className="center-lower">
                        <Button
                            variant="contained"
                            size="extra large"
                            type="submit"
                            onClick={handleSubmit}
                            sx={{
                              backgroundColor: "white",
                              color: "Black",
                              marginRight: 2,
                              "&:hover": {
                                backgroundColor: "green",
                                color: "white",
                              },
                            }}
                        >
                          Continue
                        </Button>
                        <Button
                            variant="contained"
                            size="extra large"
                            type="submit"
                            onClick={() => {
                              setInputImage(null);
                              document.getElementById("image").value = null
                              handleClose();
                            }}
                            sx={{
                              backgroundColor: "white",
                              color: "Black",
                              "&:hover": {
                                backgroundColor: "green",
                                color: "white",
                              },
                            }}
                        >
                         Cancel
                        </Button>
                      </div>
                    </Box>
                  </Modal>
                </form>

              </Grid>

          ) : (<></>)
        }
          {image ? (
              <>
                <Grid item xs={12} md={6} align={"center"}>
                <img src={`data:image/jpeg;base64,${image}`} width={416} height={416}/>
                  <Grid item xs={12} mt={6} align={"center"}>
                    <Button
                        sx={{
                          backgroundColor: "white",
                          color: "Black",
                          "&:hover": {
                            backgroundColor: "green",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          window.location.reload()
                        }}
                    >
                      Scan Again</Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} sx={{marginLeft: {xs: 3, md: 0}}}>
                  <Typography variant={"h3"} style={{color: 'white'}}>Results</Typography>
                  <Grid item xs={8} md={6}>
                  <hr style={{backgroundColor: 'white', color: 'white', borderColor: 'white', height: 0.5}}/>
                  </Grid>
                  <Grid item xs={12} mt={10}>
                    <Typography variant={"h4"} style={{color: 'white', fontWeight: 'bold'}}>
                      Polypropylene (PP)
                    </Typography>
                    <Typography variant={"h4"} style={{color: 'white'}}>
                      Detected
                    </Typography>
                    <Typography mt={5}>
                     These items can be put into your recycling bin alskjdalk alkdja aldskj
                    </Typography>
                  </Grid>
                </Grid>
              </>
          ) : (
              <></>
          )
          }


      </Grid>
    </>
  );
};

export default UploadImage;
