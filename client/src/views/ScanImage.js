import React, { useState, useEffect } from "react";
import TakePicture from "../components/Camera";
import Button from "@mui/material/Button";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { FormControl, FormLabel } from '@mui/material';

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

const ScanImage = () => {
    const [image, setImage] = useState();
    const [inputImage, setInputImage] = useState();
    const [isImageFromFile, setIsImageFromFile] = useState(true);

    const UploadCapturedImage = async() => {
        await fetch("/api/upload-captured-photo", {
            method: "POST",
            body: JSON.stringify(inputImage)
        }).then(resp => {
            resp.json().then(data => {
                console.log(data);
                setImage(data.image)
            })
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        var formData = new FormData();
        if (isImageFromFile) {
            formData = new FormData(e.target);
            const Upload = async() => {
                await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                }).then(resp => {
                    resp.json().then(data => {
                        console.log(data);
                        setImage(data.image)
                    })
                })
            }
            Upload();
        } else {
            UploadCapturedImage();
            // formData = new FormData();
            // formData.append("image", inputImage)
        }


    }

    const handleSave = (imageDataUrl) => {
        console.log("Got image")
        // console.log(imageDataUrl)
        // const file = new File([imageBlob], "input_image",{ type: "image/png" })
        setInputImage(imageDataUrl);
        setIsImageFromFile(false);
    }

    return(
        <>
            {/*<TakePicture handleSave={handleSave.bind(this)}/>*/}
            <TakePicture handleSave={handleSave.bind(this)}/>
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
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setInputImage(event.target.files[0]);
                                setIsImageFromFile(true);
                            }}
                        />
                        <label htmlFor="image">
                          <Button component="span">
                              <FileUploadIcon/>
                            Upload Image
                          </Button>
                        </label>
                    </div>
                </div>

                <div className="input-group justify-content-center mt-4">
                    <Button type="submit" className="btn btn-md btn-primary">Identify</Button>
                </div>
                <div>{
                    image ?
                        <img src={`data:image/png;base64,${image}`}/>
                        :
                        <p>This is where the results image will go.</p>
                }</div>
            </form>
        </>
    )

}

export default ScanImage;
