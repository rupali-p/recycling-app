/**
 * The camera component and image related components
 */
import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

/**
 * Displays the given image as a square and returns this square canvas image
 * @param image {Object} The image object to display (can also be a video player)
 * @param imageWidth {number} The width of the image object
 * @param imageHeight {number} The height of the image object
 * @param canvasId {string} The html id of the canvas to display the image on
 * @param canvasWidth {number} The width of the canvas
 * @param canvasHeight {number} The height of the canvas
 * @returns {HTMLElement} The canvas element with the image drawn on it
 */
export const displaySquareImage = (image, imageWidth, imageHeight, canvasId = "image-preview", canvasWidth = 400, canvasHeight = 400) => {
    const canvas = document.getElementById(canvasId)
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const context = canvas.getContext("2d");

    const minLength = Math.min(imageWidth, imageHeight)
    const left = (imageWidth - minLength) / 2;
    const top = (imageHeight - minLength) / 2;
    context.drawImage(image, left, top, minLength, minLength, 0, 0, canvas.width, canvas.height)
    return canvas
}

/**
 * Component that enables the use of the device's camera.
 * @param handleTakePhoto {CallableFunction} Function to handle when the user takes a photo.
 * @returns {JSX.Element}
 */
const Camera = ({handleTakePhoto}) => {

    const [imageDataURL, setImageDataURL] = useState()
    const [cameraAvailable, setCameraAvailable] = useState(false)
    const [player, setPlayer] = useState()
    const [isMobileDevice, setIsMobileDevice] = useState(true)
    const [closeVideo, setCloseVideo] = useState(false)
    const cameraNumber = 0

    const initializeMedia = async () => {
        setImageDataURL(null);
        if (!("mediaDevices" in navigator)) {
            navigator.mediaDevices = {};
        }

        if (!("getUserMedia" in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if (!getUserMedia) {
                    return Promise.reject(new Error("getUserMedia Not Implemented"));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        //Get the details of video inputs of the device
        const videoInputs = await getListOfVideoInputs();

        //The device has a camera
        if (videoInputs.length) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        deviceId: {
                            exact: videoInputs[cameraNumber].deviceId,
                        },
                    },
                })
                .then((stream) => {
                    player.srcObject = stream;
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("The device does not have a camera");
        }
    };

    const capturePicture = () => {
        setCloseVideo(true)
        const canvas = displaySquareImage(player, player.videoWidth, player.videoHeight)
        player.srcObject.getVideoTracks().forEach((track) => {
            track.stop();
        });
        setPlayer(null)

        setImageDataURL(canvas.toDataURL());
        handleTakePhoto(canvas.toDataURL().split(';base64,')[1])
    };


    const handleMobilePhoto = async (event) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageFile = new Image();
            imageFile.src = reader.result
            imageFile.onload = () => {
                const canvas = displaySquareImage(imageFile, imageFile.width, imageFile.height)
                handleTakePhoto(canvas.toDataURL().split(';base64,')[1])
            }
        }
        reader.readAsDataURL(event.target.files[0])

    }


    const switchCamera = async () => {
        const listOfVideoInputs = await getListOfVideoInputs();

        // The device has more than one camera
        if (listOfVideoInputs.length > 1) {
            if (player.srcObject) {
                player.srcObject.getVideoTracks().forEach((track) => {
                    track.stop();
                });
            }

            // switch to second camera
            if (this.cameraNumber === 0) {
                this.cameraNumber = 1;
            }
            // switch to first camera
            else if (this.cameraNumber === 1) {
                this.cameraNumber = 0;
            }

            // Restart based on camera input
            initializeMedia();
        } else if (listOfVideoInputs.length === 1) {
            alert("The device has only one camera");
        } else {
            alert("The device does not have a camera");
        }
    };

    const getListOfVideoInputs = async () => {
        // Get the details of audio and video output of the device
        try {
            const eD = await navigator.mediaDevices.enumerateDevices();
            //Filter video outputs (for devices with multiple cameras)
            return eD.filter((device) => device.kind === "videoinput");
        } catch {
            return []
        }

    };
    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            setIsMobileDevice(true)
        } else {
            setIsMobileDevice(false)
            setCloseVideo(false)
        }
        setCameraAvailable(true)
        getListOfVideoInputs().then((vInputs) => {
            setCameraAvailable(vInputs.length > 0 && vInputs[0].deviceId != "")

        })
    })


    return (<div>
        {!Boolean(imageDataURL) || !closeVideo ? (<video
            ref={(reference) => {
                setPlayer(reference)
            }}
            autoPlay
        ></video>) : (<></>)}
        {isMobileDevice ? (<Button component={"label"}>
            <CameraAltIcon/> Open Camera Mobile
            <input
                accept="image/*"
                id="mobile-camera-input"
                type="file"
                capture="environment"
                hidden
                onChange={handleMobilePhoto}
            />
        </Button>) : (<>
            <Button onClick={initializeMedia} disabled={!cameraAvailable}>
                <CameraAltIcon/> Open Camera
            </Button>
            <Button onClick={capturePicture}>
                <CameraIcon/> Take Photo
            </Button>
            <Button onClick={switchCamera}>
                <SwitchVideoIcon/> Switch Camera
            </Button>
        </>)}
    </div>);
}

export default Camera;