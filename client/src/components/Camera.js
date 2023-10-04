import React, {useState} from "react";
import Button from "@mui/material/Button";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

const TakePicture = ({handleSave}) => {

  const [imageDataURL, setImageDataURL] = useState()
  const [player, setPlayer] = useState()
  const cameraNumber = 0

  const initializeMedia = async() => {
    setImageDataURL(null);
    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }
    console.log("Constraints")
    console.log(navigator.mediaDevices.getSupportedConstraints())

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
    var canvas = document.createElement("canvas");
    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;
    var contex = canvas.getContext("2d");
    contex.drawImage(player, 0, 0, canvas.width, canvas.height);
    player.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    console.log(canvas.toDataURL());
    setImageDataURL(canvas.toDataURL());
    handlePhotoCapture(canvas.toDataURL().split(';base64,')[1])
  };

  const handlePhotoCapture = (imageDataURL) => {
    handleSave(imageDataURL);
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
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();

    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
  };

  const playerORImage = Boolean(imageDataURL) ? (
      <img src={imageDataURL} alt="cameraPic" />
  ) : (
      <video
          ref={(reference) => {
            setPlayer(reference)
          }}
          autoPlay
      ></video>
  );

  return (
      <div>
        {playerORImage}
        <Button onClick={initializeMedia}>
          <CameraAltIcon/> Take Photo
        </Button>
        <Button onClick={capturePicture}>
          <CameraIcon/> Capture
        </Button>
        <Button onClick={switchCamera}>
          <SwitchVideoIcon/> Switch Camera
        </Button>
      </div>
  );
}

export default TakePicture;