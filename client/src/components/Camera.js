import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

const TakePicture = ({handleTakePhoto, }) => {

  const [imageDataURL, setImageDataURL] = useState()
  const [cameraAvailable, setCameraAvailable] = useState(false)
  const [player, setPlayer] = useState()
  const [isMobileDevice, setIsMobileDevice] = useState(true)
  const cameraNumber = 0

  const initializeMedia = async() => {
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
    var imgSize = Math.min(player.videoWidth, player.videoHeight);
    var left = (player.videoWidth - imgSize) / 2;
    var top = (player.videoHeight - imgSize) / 2;

    var canvas = document.getElementById("image-preview");
    canvas.width = 400
    canvas.height = 400
    var contex = canvas.getContext("2d");
    contex.drawImage(player, left, top, imgSize, imgSize, 0, 0, canvas.width, canvas.height)
    player.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    console.log(canvas.toDataURL());
    setImageDataURL(canvas.toDataURL());
    handlePhotoCapture(canvas.toDataURL().split(';base64,')[1])
  };

  const handleMobilePhoto = async (event) => {
    const canvas = document.getElementById("image-preview")
    canvas.width = 400
    canvas.height = 400
    var contex = canvas.getContext("2d");

    const reader = new FileReader()
    reader.onloadend = () => {
      var imageFile = new Image();
      imageFile.src = reader.result
      imageFile.onload = () => {
        var imgSize = Math.min(imageFile.width, imageFile.height);
        var left = (imageFile.width - imgSize) / 2;
        var top = (imageFile.height - imgSize) / 2;

        contex.drawImage(imageFile, left, top, imgSize, imgSize, 0, 0, canvas.width, canvas.height)
        handlePhotoCapture(canvas.toDataURL().split(';base64,')[1])

      }
    }
    reader.readAsDataURL(event.target.files[0])

  }



  const handlePhotoCapture = (imageDataURL) => {
    handleTakePhoto(imageDataURL);
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
      const eD= await navigator.mediaDevices.enumerateDevices();
      //Filter video outputs (for devices with multiple cameras)
      return eD.filter((device) => device.kind === "videoinput");
    } catch {
      return []
    }

  };
  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test (navigator.userAgent)) {
      setIsMobileDevice(true)
   }
   else {
     setIsMobileDevice(false)
   };
    setCameraAvailable(true)
        getListOfVideoInputs().then((vInputs) => {
          console.log(vInputs)

          console.log(vInputs.length > 0 && vInputs[0].deviceId != "")
          setCameraAvailable(
              vInputs.length > 0 && vInputs[0].deviceId != ""
          )

        })
      }
  )

  return (
      <div>
        {
          !Boolean(imageDataURL) ? (
              <video
                  ref={(reference) => {
                    setPlayer(reference)
                  }}
                  autoPlay
              ></video>
          ) : (
              <></>
          )
        }
        {
          isMobileDevice ? (
              <Button component={"label"}>
                <CameraAltIcon/> Open Camera Mobile
                <input
                    accept="image/*"
                    id="mobile-camera-input"
                    type="file"
                    capture="environment"
                    hidden
                    onChange={handleMobilePhoto}
                />
              </Button>
          ) : (
              <>
                <Button onClick={initializeMedia} disabled={!cameraAvailable}>
                  <CameraAltIcon/> Open Camera
                </Button>
                <Button onClick={capturePicture}>
                  <CameraIcon/> Take Photo
                </Button>
                <Button onClick={switchCamera}>
                  <SwitchVideoIcon/> Switch Camera
                </Button>
              </>
          )
        }
      </div>
  );
}

export default TakePicture;