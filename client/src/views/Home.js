import * as React from "react";
import "../css/Common.css";
import moebius from "../images/moebius-loop.png";
import Button from "@mui/material/Button";
import { Navbar } from "../components/Navbar";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="gradient_background">
        <Navbar />
        <div className="bodyWrapper">
          <div className="descriptive-text">
            <p sx={{ p: 5 }}>
              Currently, only 13% of plastics in Australia are being recycled
              correctly.
              <br />
              You can do better than that.
              <br />
            </p>
            <p>
              <Button
                variant="contained"
                color="grey"
                sx={{ p: 2 }}
                href={"./BeginScan"}
              >
                Begin Scan
              </Button>
            </p>
          </div>

          <div className="moebius-image-container">
            <img src={moebius} alt="Moebius Loop" style={{ paddingTop: 15 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
