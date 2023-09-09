import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImageUploader from "./ImageUploader";


// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

function App() {
    return (
        <>
            <BrowserRouter>
                <Link to="/identify-symbol" className="btn btn-primary">Identify Symbol Page</Link>
                <Routes>
                    <Route path="/" >
                        <Route path="identify-symbol" element={<ImageUploader />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
  );

  // return (
  //     <div>
  //         <h1>Hello, World!</h1>
  //     </div>
  // )

  // useEffect(() => {
  //   fetch("/members")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     });
  // }, []);
  //
  // return (
  //   <div>
  //     {typeof data.members === "undefined" ? (
  //       <p>Loading...</p>
  //     ) : (
  //       data.members.map((member, i) => <p key={i}>{member}</p>)
  //     )}
  //   </div>
  // );
}

export default App;
