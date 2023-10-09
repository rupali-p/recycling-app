import React, { useState } from "react";
import TakePicture from "../components/Camera";
import Button from "@mui/material/Button";
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
                        console.log("Image response")
                        console.log(data);
                        setImage(data.image)
                    })
                })
            }
            Upload();
        } else {
            UploadCapturedImage();
        }


    }

    const handleSave = (imageDataUrl) => {
        console.log("Got image")
        setInputImage(imageDataUrl);
        setIsImageFromFile(false);
    }

    const handleUploadFile = async (event) => {

        const reader = new FileReader()
        reader.onloadend = () => {
            var imageFile = new Image();
            imageFile.src = reader.result
            imageFile.onload = () => {
                const canvas = document.getElementById("image-preview")
                canvas.width = 400
                canvas.height = 400
                var imgSize = Math.min(imageFile.width, imageFile.height);
                var left = (imageFile.width - imgSize) / 2;
                var top = (imageFile.height - imgSize) / 2;
                var contex = canvas.getContext("2d");

                contex.drawImage(imageFile, left, top, imgSize, imgSize, 0, 0, canvas.width, canvas.height)
                setInputImage(canvas.toDataURL().split(';base64,')[1])
                setIsImageFromFile(false);

            }

            console.log("Image File")
            console.log(imageFile)

        }
        reader.readAsDataURL(event.target.files[0])
    }


    return(
        <>
            <canvas id={"image-preview"}/>
            <TakePicture handleTakePhoto={handleSave} />
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
