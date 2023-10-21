/**
 * Scan Image page
 */
import React, {useState, useLayoutEffect} from "react";
import {
    Grid,
    Typography
} from "@mui/material";
import Camera, {displaySquareImage} from "../components/Camera";
import {SymbolInfo, getDetectionsInfo, ScanAgainButton} from "./UploadImage";
import TopNav from "../components/TopNav";


const ScanImage = () => {
    const [image, setImage] = useState();
    const [inputImage, setInputImage] = useState();

    const [symbolApplications, setSymbolApplications] = useState();
    const [symbolName, setSymbolName] = useState();
    const [symbolDescription, setSymbolDescription] = useState();
    const [symbolBin, setSymbolBin] = useState();

    const getSymbolInfo = async (articleNumber) => {
        const apiPath = `/api/view-result/${articleNumber}`
        await fetch(apiPath, {
            method: "GET",
        }).then((resp) => {
            resp.json().then((data) => {
                console.log(data)
                setSymbolApplications(data["Applications of PIC"])
                setSymbolName(data["Pic Name"])
                setSymbolDescription(data["Short Description"])
                setSymbolBin(data["Bin to use"])
            });
        });
    };

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
                const detectionsInfo = getDetectionsInfo(data.detections)
                detectionsInfo.length == 0 ? (
                    setSymbolName("No Detections")
                ) : (
                    getSymbolInfo(detectionsInfo[0])
                )
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
        setInputImage(imageDataUrl)
        await fetch("/api/upload", {
            method: "POST", body: JSON.stringify(imageDataUrl)
        }).then(resp => {
            resp.json().then(data => {
                setImage(data.image)
                const detectionsInfo = getDetectionsInfo(data.detections)
                detectionsInfo.length == 0 ? (
                    setSymbolName("No Detections")
                ) : (
                    getSymbolInfo(detectionsInfo[0])
                )
            })
        })

    }

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h1"} style={{color: "white"}}>
                    Hamlet
                </Typography>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <form onSubmit={handleSubmit} className="container mt-5 pt-5 pb-5" encType="multipart/form-data">
                    <div className="form-inline justify-content-center mt-5">
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
            {image ? (
                <>
                    <Grid item xs={12} md={6} align={"center"}>
                        <img src={`data:image/jpeg;base64,${image}`} width={416} height={416}/>
                        <Grid item xs={12} mt={6} align={"center"}>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{marginLeft: {xs: 3, md: 0}}}>
                        {(symbolName && symbolName != 'No Detections') ? (
                            <SymbolInfo
                                symbolName={symbolName}
                                symbolDescription={symbolDescription}
                                symbolApplications={symbolApplications}
                                symbolBin={symbolBin}
                                AgainButton={ScanAgainButton}
                            />
                        ) : <></>
                        }
                        {symbolName == 'No Detections' ? (
                            <>
                                <Typography variant={"h3"} style={{color: 'white'}} mb={5}>No Detections</Typography>
                                <ScanAgainButton/>
                            </>
                        ) : (
                            <></>
                        )
                        }
                    </Grid>
                </>
            ) : (
                <Grid item xs={12} md={6} align={"center"}>
                    <Camera handleTakePhoto={handleTakePhoto}/>
                </Grid>
            )
            }

        </Grid>

    </>)

}

export default ScanImage;
