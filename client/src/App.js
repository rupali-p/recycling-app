import React, { useState, useEffect } from 'react'

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000


function App() {

const[data, setData] = useState([{}])

  useEffect(() => {
    fetch("/apiTests").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
    </div>
  )
}

export default App