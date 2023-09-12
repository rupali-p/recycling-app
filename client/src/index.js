import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import HomePage from './components/Home';
import LoginPage from './components/Login';
//import NavBar from './components/Navbar';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const App=()=>{

    
  return (
    <Router>
    <div className="">
        {/* <NavBar/> */}
        <Routes>
            <Route path="/login">
                <LoginPage/>
            </Route>    
            <Route path="/">
                <HomePage/>
            </Route>
        </Routes>
    </div>
    </Router>
  )
}


ReactDOM.render(<App/>,document.getElementById('root'))
