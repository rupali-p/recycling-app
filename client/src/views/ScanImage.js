/**
 * Scan Image page
 */
import React, {useState} from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Camera, {displaySquareImage} from "../components/Camera";

const ScanImage = () => {
    const [image, setImage] = useState();
    const [inputImage, setInputImage] = useState();

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
                const canvas = displaySquareImage(imageFile, imageFile.width, imageFile.height)
                setInputImage(canvas.toDataURL().split(';base64,')[1])

            }

        }
        reader.readAsDataURL(event.target.files[0])
    }


    return (<>
            <canvas id={"image-preview"}/>
            <Camera handleTakePhoto={setInputImage}/>
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
                <div>{image ? <img src={`data:image/png;base64,${image}`}/> :
                    <p>This is where the results image will go.</p>}</div>
            </form>
        </>)

}

export default ScanImage;
