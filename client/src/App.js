import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import ScanImage from './views/ScanImage';
import UploadImage from './views/UploadImage';
import Counter from './views/Counter';
import Account from './views/Account';
import PICResult1 from './views/PICResult1';
import PICResult2 from './views/PICResult2';
import PICResult3 from './views/PICResult3';
import PICResult4 from './views/PICResult4';
import PICResult5 from './views/PICResult5';
import PICResult6 from './views/PICResult6';
import PICResult7 from './views/PICResult7';
import AboutUs from './views/AboutUs';
import BeginScan from './views/BeginScan';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/pic-result-1" element={<PICResult1 />} />
        <Route path="/pic-result-2" element={<PICResult2 />} />
        <Route path="/pic-result-3" element={<PICResult3 />} />
        <Route path="/pic-result-4" element={<PICResult4 />} />
        <Route path="/pic-result-5" element={<PICResult5 />} />
        <Route path="/pic-result-6" element={<PICResult6 />} />
        <Route path="/pic-result-7" element={<PICResult7 />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* <PrivateRoute path="/account" element={<Account />} />
        <PrivateRoute path="/scan-image" element={<ScanImage />} />
        <PrivateRoute path="/upload-image" element={<UploadImage />} />
        <PrivateRoute path="/begin-scan" element={<BeginScan />} /> */}
        <Route exact path='/begin-scan' element={<PrivateRoute/>}>
            <Route exact path='/begin-scan' element={<BeginScan/>}/>
          </Route>
      </Routes>
    </Router>
  );
};

export default App;
