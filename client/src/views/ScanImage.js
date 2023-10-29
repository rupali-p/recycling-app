/**
 * Scan Image page
 */
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
    Grid,
    Typography
} from "@mui/material";
import Camera, { displaySquareImage } from "../components/Camera";
import { ArlInfo, SymbolInfo, getDetectionsInfo, ScanAgainButton } from "./UploadImage";
import TopNav from "../components/TopNav";
import {Navbar} from "../components/Navbar";
import {ARL_CLASS_LABELS_MAPPING, RESULTS_MAPPING} from "../const";


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
    const [resultLink, setResultLink] = useState();
    const [resultLinkText, setResultLinkText] = useState();

    const [usedArlModel,setUsedArlModel] = useState();
    const [arlResults, setArlResults] = useState([]);

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
                setResultLink(RESULTS_MAPPING[data["Bin to use"]]["resultLink"])
                setResultLinkText(RESULTS_MAPPING[data["Bin to use"]]["resultLinkText"])
            });
        });
    };

    const getArlInfo = async (articleNumbers) => {
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
                    arl_res.Abbreviation = ARL_CLASS_LABELS_MAPPING[arl_res.Name]["abbr"]
                    arl_res.SymbolImage = ARL_CLASS_LABELS_MAPPING[arl_res.Name]["symbolImage"]
                    arl_res.ResultLink = RESULTS_MAPPING[arl_res["Result"]]["resultLink"]
                    arl_res.ResultLinkText = RESULTS_MAPPING[arl_res["Result"]]["resultLinkText"]
                    arl_info.push(arl_res)
                })

                setArlResults(arl_info)
            })
        })
    }

    useLayoutEffect(() => {
        document.body.style.background = "linear-gradient(90deg, #12261E, #1A4D39)"
    })


    const handleTakePhoto = async (imageDataUrl) => {
        setInputImage(imageDataUrl)
        await fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "image_data": imageDataUrl
            })
        }).then(resp => {
            resp.json().then(data => {
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
            })
        })

    }

        if (windowWidth >= 1024) {
            return (
                <>
            <Navbar />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                </Grid>
                {image ? (
                    <>
                        <Grid item xs={12} md={6} align={"center"}>
                            <img src={`data:image/jpeg;base64,${image}`} width={416} height={416} />
                            <Grid item xs={12} mt={6} align={"center"}>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ marginLeft: { xs: 3, md: 0 } }}>
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
                                </>
                            ) : (
                                <SymbolInfo
                                    symbolName={symbolName}
                                    symbolDescription={symbolDescription}
                                    symbolApplications={symbolApplications}
                                    symbolBin={symbolBin}
                                    resultLink={resultLink}
                                    resultLinkText={resultLinkText}
                                    AgainButton={ScanAgainButton}
                                />

                                )

                            ) : (
                                <></>
                            )

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
                    <Grid item xs={12} align={"center"}>
                        <Camera handleTakePhoto={handleTakePhoto} />
                    </Grid>
                )
                }

            </Grid>

        </>
            )
        }
        else {
            return (
                <>
            <Navbar />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                </Grid>
                {image ? (
                    <>
                        <Grid item xs={12} md={6} align={"center"}>
                            <img src={`data:image/jpeg;base64,${image}`} width={'100%'} height={416} />
                            <Grid item xs={12} mt={6} align={"center"}>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ marginLeft: { xs: 3, md: 0 } }}>
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
                                    <Typography variant={"h3"} style={{ color: 'white' }} mb={5}>No Detections</Typography>
                                    <div sx={{ textAlign: 'center', marginLeft:'50%' }}>
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
                    <Grid item xs={12} align={"center"}>
                        <Camera handleTakePhoto={handleTakePhoto} />
                    </Grid>
                )
                }

            </Grid>

        </>
            )
        }

}

export default ScanImage;
