import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import CounterPage from "./pages/CounterPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import ScanImage from './views/ScanImage';
import UploadImage from './views/UploadImage';

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/ScanImage" element={<ScanImage/>}/>
        <Route path="/UploadImage" element={<UploadImage/>}/>
      </Routes>
    </Router>
    <div>
      <CounterPage />
      {/* {typeof data.members === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => <p key={i}>{member}</p>)
      )} */}
    </div>
  );
};

export default App;