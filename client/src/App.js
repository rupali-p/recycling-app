import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import PICResult from './views/PICResult';
import Counter from "./views/Counter";
import ScanImage from './views/ScanImage';
import UploadImage from './views/UploadImage';
import PICResult1 from './views/PICResult1';
import PICResult2 from './views/PICResult2';
import PICResult3 from './views/PICResult3';
import PICResult4 from './views/PICResult4';
import PICResult5 from './views/PICResult5';
import PICResult6 from './views/PICResult6';
import PICResult7 from './views/PICResult7';

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/ScanImage" element={<ScanImage/>}/>
                <Route path="/UploadImage" element={<UploadImage/>}/>
                <Route path="/Counter" element={<Counter/>}/>
                <Route path="/PICResult1" element={<PICResult1 />} />
                <Route path="/PICResult2" element={<PICResult2 />} />
                <Route path="/PICResult3" element={<PICResult3 />} />
                <Route path="/PICResult4" element={<PICResult4 />} />
                <Route path="/PICResult5" element={<PICResult5 />} />
                <Route path="/PICResult6" element={<PICResult6 />} />
                <Route path="/PICResult7" element={<PICResult7 />} />
            </Routes>
        </Router>
    );
};

export default App;