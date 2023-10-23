/**
 * Upload Image page
 */
import React, {useLayoutEffect, useState} from "react";
import {displaySquareImage} from "../components/Camera";
import "../css/Common.css";
import {styled } from "@mui/material/styles";
import {
    Button,
    Grid,
    Box,
    Modal,
    Typography,
    Divider,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TopNav from "../components/TopNav";
import {CLASS_ARTICLE_MAPPING, ARL_CLASS_LABELS_MAPPING} from "../const";
import {Link} from "react-router-dom";


/**
 * Extracts the detections information from the json string
 * @param detections {string} The json string that contains the detections
 * @returns {*[]} The information for each detection
 */
export const getDetectionsInfo = (detections) => {
    const detectionsArray = JSON.parse(detections)
    const info = []
    detectionsArray.forEach((detection) => {
        info.push({
            "label": detection.class_label,
            "articleNumber":CLASS_ARTICLE_MAPPING[detection.class_label]
        })
    })
    return info
}


export const buttonStyles = {
    backgroundColor: "white",
    color: "Black",
    marginRight: 2,
    "&:hover": {
        backgroundColor: "green",
        color: "white",
    },
}

export const ScanAgainButton = () => {
    return (
        <Button sx={buttonStyles}
                onClick={() => {
                    window.location.reload()
                }}
        >Scan Again
        </Button>
    )
}

/**
 * Component that displays the detected symbol's information
 * @param symbolName: Name of the symbol
 * @param symbolDescription: Symbol's description
 * @param symbolBin: Bin to use
 * @param symbolApplications: Where the symbol/material is used
 * @param AgainButton: Scan/Upload again button
 * @returns {JSX.Element} Component that shows the symbol's information
 */

export const ArlInfo = ({symbolResults, AgainButton}) => {
    return (
        <>
            <Typography variant={"h3"} style={{color: 'white'}}>Results</Typography>
            <Grid item xs={8} md={5} mt={1}>
                <Divider component="li" sx={{
                    listStyleType: "none",
                    borderColor: 'white',
                    borderBottomWidth: 4
                }}/>
            </Grid>
            <Grid item xs={12} mt={10}>
                {symbolResults.map((info) => {
                    return(
                        <>
                            <Typography mt={1} variant={"h6"} style={{color: 'white'}}>
                                {info["Name"]} - {info["Abbreviation"]}
                            </Typography>
                            <Typography mt={1} variant={"h6"} style={{color: 'white'}}>
                                {info["Symbol"]}
                            </Typography>
                        </>

                        )

                })}
            </Grid>
            <Grid container xs={12} md={8} mt={10}>
                <Grid item xs={6}>
                    <AgainButton/>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={buttonStyles}>
                        <Link to="/PICResult1" style={{textDecoration: 'none', color: 'black'}}>Go to Recycling
                            Checklist</Link>
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export const SymbolInfo = ({symbolName, symbolDescription, symbolBin, symbolApplications, AgainButton}) => {
    return (
        <>
            <Typography variant={"h3"} style={{color: 'white'}}>Results</Typography>
            <Grid item xs={8} md={5} mt={1}>
                <Divider component="li" sx={{
                    listStyleType: "none",
                    borderColor: 'white',
                    borderBottomWidth: 4
                }}/>
            </Grid>
            <Grid item xs={12} mt={10}>
                <Typography variant={"h4"} style={{color: 'white', fontWeight: 'bold'}}>
                    {symbolName}
                </Typography>
                <Typography variant={"h4"} style={{color: 'white'}}>
                    Detected
                </Typography>
                <Typography mt={5} variant={"h6"} style={{color: 'white'}}>
                    Bin to use: <strong>{symbolBin}</strong>
                </Typography>
                <Typography mt={1} variant={"h6"} style={{color: 'white'}}>
                    Applications of PIC: {symbolApplications}
                </Typography>
                <Typography mt={1} variant={"h6"} style={{color: 'white'}}>
                    Description: {symbolDescription}
                </Typography>
            </Grid>
            <Grid container xs={12} md={8} mt={10}>
                <Grid item xs={6}>
                    <AgainButton/>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={buttonStyles}>
                        <Link to="/PICResult1" style={{textDecoration: 'none', color: 'black'}}>Go to Recycling
                            Checklist</Link>
                    </Button>
                </Grid>
            </Grid>
        </>
    )
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
    const [symbolApplications, setSymbolApplications] = useState();
    const [symbolName, setSymbolName] = useState();
    const [symbolDescription, setSymbolDescription] = useState();
    const [symbolBin, setSymbolBin] = useState();
    const [usedArlModel,setUsedArlModel] = useState();
    const [arlResults, setArlResults] = useState([]);


    const getInfo = async (articleNumber, usedArlModel, abbr=null) => {
        const apiPath = `/api/view-result/${articleNumber}`
        await fetch(apiPath, {
            method: "GET",
        }).then((resp) => {
            resp.json().then((data) => {
                return (
                    {
                        "Name": data["ARL Name"],
                        "Symbol Description": data["Symbol"],
                        "Abbreviation": abbr
                    }

                )
            });
        });
    };
    const getSymbolInfo = async (articleNumber) => {
        const apiPath = `/api/view-result/${articleNumber}`
        await fetch(apiPath, {
            method: "GET",
        }).then((resp) => {
            resp.json().then((data) => {
                setSymbolApplications(data["Applications of PIC"])
                setSymbolName(data["Pic Name"])
                setSymbolDescription(data["Short Description"])
                setSymbolBin(data["Bin to use"])
            });
        });
    };

    const getArlInfo = async(articleNumbers, abbreviations) => {
        await fetch("/api/view-results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "article_numbers": articleNumbers
            })
            }
        ).then((res) => {
            res.json().then((data) => {
                const arl_results = JSON.parse(data.arl_results)
                const arl_info = []
                arl_results.forEach((arl_res) => {
                    arl_res.Abbreviation = ARL_CLASS_LABELS_MAPPING[arl_res.Name]
                    arl_info.push(arl_res)
                })

                setArlResults(arl_info)
            })
        })
    }

    const handleSubmit = async (e) => {
        console.log("Submitting")
        e.preventDefault();
        await fetch("/api/upload", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "image_data": inputImage,
            }),
        }).then((resp) => {
            resp.json().then((data) => {
                const _usedArlModel = data.model_used == "arl"
                setUsedArlModel(_usedArlModel)
                setImage(data.image);
                const detectionsInfo = getDetectionsInfo(data.detections)

                if (detectionsInfo.length == 0) {
                    setSymbolName("No Detections")
                } else if (_usedArlModel) {
                    const articleNumbers = []
                    for (const detectionInfo of detectionsInfo) {
                        articleNumbers.push(detectionInfo["articleNumber"])
                    }
                    getArlInfo(articleNumbers)
                } else {
                    getSymbolInfo(detectionsInfo[0]["articleNumber"])
                }

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
                                                p={{xs: 10, md: 25}}
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
                                                sx={buttonStyles}
                                            >
                                                Identify
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
                                                sx={buttonStyles}
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
                {/*Results*/}
                {image ? (
                    <>
                        <Grid item xs={12} md={6} align={"center"}>
                            <img src={`data:image/jpeg;base64,${image}`} width={416} height={416}/>
                            <Grid item xs={12} mt={6} align={"center"}>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{marginLeft: {xs: 3, md: 0}}}>
                            {(symbolName != 'No Detections' && (symbolName || arlResults.length > 0)) ? (
                                usedArlModel ? (
                                    <>
                                        <ArlInfo
                                            symbolResults={arlResults}
                                            AgainButton={ScanAgainButton}
                                        />
                                    </>
                                ) : (
                                    <SymbolInfo
                                        symbolName={symbolName}
                                        symbolDescription={symbolDescription}
                                        symbolApplications={symbolApplications}
                                        symbolBin={symbolBin}
                                        AgainButton={ScanAgainButton}
                                    />

                                )

                            ) : (
                                <></>
                            )

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
                    <></>
                )
                }
            </Grid>
        </>
    );
};

export default UploadImage;
