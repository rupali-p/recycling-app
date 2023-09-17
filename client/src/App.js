import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
=======
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login";

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/Login" element={<Login />} />
>>>>>>> 87a2783 (T042 WIP Create Login)
      </Routes>
    </Router>
  );
};

export default App;