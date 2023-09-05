import React from "react";
import Button from "@mui/material/Button";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import SwitchVideoIcon from '@mui/icons-material/SwitchVideo';

class TakePicture extends React.Component {
  constructor() {
    super();

    this.cameraNumber = 0;

    this.state = {
      imageDataURL: null,
    };
  }

  initializeMedia = async () => {
    this.setState({ imageDataURL: null });

    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia Not Implemented"));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    //Get the details of video inputs of the device
    const videoInputs = await this.getListOfVideoInputs();

    //The device has a camera
    if (videoInputs.length) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: {
              exact: videoInputs[this.cameraNumber].deviceId,
            },
          },
        })
        .then((stream) => {
          this.player.srcObject = stream;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("The device does not have a camera");
    }
  };

  handleSave = (imageDataURL) => {
    this.props.handleSave(imageDataURL);
  }

  capturePicture = () => {
    var canvas = document.createElement("canvas");
    canvas.width = this.player.videoWidth;
    canvas.height = this.player.videoHeight;
    var contex = canvas.getContext("2d");
    contex.drawImage(this.player, 0, 0, canvas.width, canvas.height);
    this.player.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    console.log(canvas.toDataURL());
    this.setState({ imageDataURL: canvas.toDataURL() });
    this.handleSave(canvas.toDataURL().split(';base64,')[1]);

    // var canvas = document.createElement("canvas");
    // canvas.width = this.player.videoWidth;
    // canvas.height = this.player.videoHeight;
    // var contex = canvas.getContext("2d");
    // contex.drawImage(this.player, 0, 0, canvas.width, canvas.height);
    // this.player.srcObject.getVideoTracks().forEach((track) => {
    //   track.stop();
    // });
    //
    // const imageDataURL = canvas.toDataURL("image/png").split(';base64,')[1];
    // this.setState({ imageDataURL: imageDataURL });
    // canvas.toBlob((blob) => {
    //   let file = new File([blob], "fileName.png", { type: "image/png" });
    //   this.handleSave(file);
    // }, 'image/png');
    // canvas.toBlob((blob) => {
    //   imgBlob = blob;
    // })
    // console.log(imgBlob);
    // this.handleSave(imageDataURL)
  };

  switchCamera = async () => {
    const listOfVideoInputs = await this.getListOfVideoInputs();

    // The device has more than one camera
    if (listOfVideoInputs.length > 1) {
      if (this.player.srcObject) {
        this.player.srcObject.getVideoTracks().forEach((track) => {
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
      this.initializeMedia();
    } else if (listOfVideoInputs.length === 1) {
      alert("The device has only one camera");
    } else {
      alert("The device does not have a camera");
    }
  };

  getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();

    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
  };

  render() {
    const playerORImage = Boolean(this.state.imageDataURL) ? (
      <img src={this.state.imageDataURL} alt="cameraPic" />
    ) : (
      <video
        ref={(refrence) => {
          this.player = refrence;
        }}
        autoPlay
      ></video>
    );

    return (
      <div>
        {playerORImage}
        <Button onClick={this.initializeMedia}>
          <CameraAltIcon/> Take Photo
        </Button>
        <Button onClick={this.capturePicture}>
          <CameraIcon/> Capture
        </Button>
        <Button onClick={this.switchCamera}>
          <SwitchVideoIcon/> Switch Camera
        </Button>
      </div>
    );
  }
}

export default TakePicture;