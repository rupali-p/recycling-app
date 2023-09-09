import React, { useState, useEffect } from "react";

// Change the directory the client folder and use the command 'npm start' to launch the front end on port 3000

function App() {
    const [image, setImage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        const Upload = async() => {
            await fetch('/api/upload', {
                method: 'POST',
                body: formData
            }).then(resp => {
                resp.json().then(data => {
                    console.log(data);
                    setImage(data.image)
                })
            })
        }
        Upload();
    }

    return(
        <form onSubmit={handleSubmit} className="container mt-5 pt-5 pb-5" encType="multipart/form-data">
            <div className="form-inline justify-content-center mt-5">
                <label htmlFor="image" className="ml-sm-4 font-weight-bold mr-md-4">Image : </label>
                <div className="input-group">
                    <input type="file" id="image" name="file"
                           accept="image/*" className="file-custom"/>
                </div>
            </div>

            <div className="input-group justify-content-center mt-4">
                <button type="submit" className="btn btn-md btn-primary">Upload,,,</button>
            </div>
            <div>{
                image ?
                    <img src={`data:image/png;base64,${image}`}/>
                    :
                    <p>This is where the results image will go.</p>
            }</div>
        </form>
    )

}

export default App;
