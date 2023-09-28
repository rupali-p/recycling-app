import React, { useState, useEffect } from "react";


function Result() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    pic_name: "",
    desc: "",
    result: "",
    Applications: "",
  });

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from
      // flask server it will be redirected to proxy
      fetch("/api/view-PIC").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setdata({
                  pic_name: data.pic_name,
                  desc: data.desc,
                  result: data.result,
                  Applications: data.Applications,
              });
          })
      );
  }, []);

  return (
      <div className="App">
          <header className="App-header">
              <h1>Results are</h1>
              <p>{data.pic_name}</p>
              <p>{data.desc}</p>
              <p>{data.result}</p>
              <p>{data.Applications}</p>

          </header>
      </div>
  );
}

export default Result;
