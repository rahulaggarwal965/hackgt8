import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "../css/Upload.css"
const Upload = () => {
    const [URL, setURL] = useState("");
    const inputTextHandler = (e) => {
        setURL(e.target.value);
    };
    function sendReq() {
        let baseURL = "http://128.61.16.132:5000/";
        
        fetch(baseURL, {
            method: 'GET', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            'videoURL': URL,
            'transcribe_audio': 0,
            'draw_window': 0
            }
        }).then(response => response.json())
        .then(data => {
          
        });
    }
    return (
        <div>
            <img className="logo" src={"outlogo.jpg"} height="300px" />
            <div className="form">
                <div>
                    <TextField value={URL} onChange={inputTextHandler} id="outlined-basic" label="URL" variant="outlined" />
                </div>
                <div id="upload-btn">
                    <Button onSubmit={sendReq} variant="contained" size="large">Submit</Button>
                </div>
            </div>
        </div>
    );

};

export default Upload;