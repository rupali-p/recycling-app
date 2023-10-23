import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Counter from "./views/Counter";
import ScanImage from "./views/ScanImage";
import UploadImage from "./views/UploadImage";
import PICResult1 from "./views/PICResult1";
import PICResult2 from "./views/PICResult2";
import PICResult3 from "./views/PICResult3";
import PICResult4 from "./views/PICResult4";
import PICResult5 from "./views/PICResult5";
import PICResult6 from "./views/PICResult6";
import PICResult7 from "./views/PICResult7";
import Account from "./views/Account";
import Checklist from "./views/Checklist";
import YellowBinResult from './views/YellowBinResult';
import RedBinResult from './views/RedBinResult';

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

const App = () => {
  const PrivateRoute = ({ children }) => {
    const userName = localStorage.getItem("userName");

    const saveRouteAndRedirect = () => {
      const selectedRoute = window.location.pathname;
      localStorage.setItem("selectedRoute", selectedRoute);
      console.log("confirm " + localStorage.getItem("selectedRoute"));
      return <Navigate to="/login" />;
    };
  
    return userName ? (
      // If userName is true, render the provided children
      children
    ) : (
      // If userName is false, navigate to "/login" and save the selected route
      saveRouteAndRedirect()
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Checklist" element={<Checklist />} />
        <Route path="/PICResult1" element={<PICResult1 />} />
        <Route path="/PICResult2" element={<PICResult2 />} />
        <Route path="/PICResult3" element={<PICResult3 />} />
        <Route path="/PICResult4" element={<PICResult4 />} />
        <Route path="/PICResult5" element={<PICResult5 />} />
        <Route path="/PICResult6" element={<PICResult6 />} />
        <Route path="/PICResult7" element={<PICResult7 />} />
        <Route path="/YellowBinResult" element={<YellowBinResult />} />
        <Route path="/RedBinResult" element={<RedBinResult />} />

        <Route path="/Account" element={<PrivateRoute><Account /></PrivateRoute>}/>
        <Route path="/ScanImage" element={<PrivateRoute><ScanImage /></PrivateRoute>}/>
        <Route path="/UploadImage" element={<PrivateRoute><UploadImage /></PrivateRoute>}/>

      </Routes>
    </Router>
  );
};

export default App;

