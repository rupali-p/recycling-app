/**
 * Scan Image page
 */
import React, {useState, useLayoutEffect} from "react";
import {
    Button,
    Grid,
    Box,
    Modal,
    Typography
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Camera, {displaySquareImage} from "../components/Camera";


const ScanImage = () => {
    const [image, setImage] = useState();
    const [inputImage, setInputImage] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useLayoutEffect(() => {
        document.body.style.background = "linear-gradient(90deg, #12261E, #1A4D39)"
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch("/api/upload", {
            method: "POST", body: JSON.stringify(inputImage)
        }).then(resp => {
            resp.json().then(data => {
                setImage(data.image)
            })
        })
    }

    const handleUploadFile = async (event) => {

        const reader = new FileReader()
        reader.onloadend = () => {
            const imageFile = new Image();
            imageFile.src = reader.result
            imageFile.onload = () => {
                const canvas = displaySquareImage(imageFile, imageFile.width, imageFile.height, "image-preview")
                setInputImage(canvas.toDataURL().split(';base64,')[1])

            }

        }
        reader.readAsDataURL(event.target.files[0])
    }

    const handleTakePhoto = async (imageDataUrl) => {
        const imageFile = new Image();
        imageFile.src = imageDataUrl
        imageFile.onload = async () => {
            const canvas = displaySquareImage(imageFile, imageFile.width, imageFile.height, "image-preview")
            const imageURL = canvas.toDataURL().split(';base64,')[1]
            setInputImage(imageURL)
            await fetch("/api/upload", {
                method: "POST", body: JSON.stringify(imageURL)
            }).then(resp => {
                resp.json().then(data => {
                    setImage(data.image)
                })
            })
        }


    }


    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h>Hamlet.</h>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <form onSubmit={handleSubmit} className="container mt-5 pt-5 pb-5" encType="multipart/form-data">
                    <div className="form-inline justify-content-center mt-5">
                        {/*<label htmlFor="image" className="ml-sm-4 font-weight-bold mr-md-4">Image : </label>*/}
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
                        </div>
                    </div>
                </form>

            </Grid>

            <Grid item xs={12} md={6} align={"center"}>
                <canvas id={"image-preview"}/>
                <Camera handleTakePhoto={handleTakePhoto}/>
            </Grid>
            <Grid item xs={12} md={6} align={"center"}>
                {image ? (
                    <>
                        <img src={`data:image/jpeg;base64,${image}`} width={416} height={416}/>
                        <Typography>Detections</Typography>
                    </>
                    ) : (
                    <Typography>This is where the results image will go.</Typography>
                    )
                }
            </Grid>
        </Grid>

        </>)

}

export default ScanImage;
