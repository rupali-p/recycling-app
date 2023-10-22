/**
 * Scan Image page
 */
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
    Grid,
    Typography,
    Box
} from "@mui/material";
import Camera, { displaySquareImage } from "../components/Camera";
import { SymbolInfo, getDetectionsInfo, ScanAgainButton } from "./UploadImage";
import TopNav from "../components/TopNav";


const ScanImage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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


    if (windowWidth >= 1024) { // Laptop size
        return (<>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h1"} style={{ color: "white" }}>
                        Hamlet.
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
                            <img src={`data:image/jpeg;base64,${image}`} width={416} height={416} />
                            <Grid item xs={12} mt={6} align={"center"}>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ marginLeft: { xs: 3, md: 0 } }}>
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
                                    <Typography variant={"h3"} style={{ color: 'white' }} mb={5}>No Detections</Typography>
                                    <ScanAgainButton />
                                </>
                            ) : (
                                <></>
                            )
                            }
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12} md={6} align={"center"}>
                        <Camera handleTakePhoto={handleTakePhoto} />
                    </Grid>
                )
                }

            </Grid>

        </>)
    } else { // Phone size
        return (<>
            <Grid className="gradient_background">
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid className="gradient_background" item xs={12} sm={8} md={5} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant={"h1"} style={{ color: "white" }}>
                                        Hamlet.
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
                                        <Grid item style={{align: 'center', width: '100vh', maxWidth: '100vh'}} xs={12} md={6}>
                                            <img src={`data:image/jpeg;base64,${image}`} width={416} height={416} />
                                            <Grid item xs={12} mt={6} align={"center"}>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} style={{align: 'center', width: '100vh'}}>
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
                                                    <div style={{align: 'center', width: '100vh'}}>
                                                    <Typography variant={"h3"} style={{ color: 'white' }} mb={5}>No Detections</Typography>
                                                    <ScanAgainButton />
                                                     </div>
                                                    
                                                </>
                                            ) : (
                                                <></>
                                            )
                                            }
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item xs={12} md={6} style={{align: 'center', width: '50vh'}}>
                                        <Camera handleTakePhoto={handleTakePhoto} />
                                    </Grid>
                                )
                                }

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
        );
    }

}

export default ScanImage;
