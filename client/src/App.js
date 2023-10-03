import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import AboutUs from './views/AboutUs';

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;