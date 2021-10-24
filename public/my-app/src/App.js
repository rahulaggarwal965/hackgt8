import React, {useState, useEffect, useMemo} from "react";
import Audio from "./components/Audio";
import Slide from "./components/Slide";
import "./App.css";
import slidesjson from "./components/slidesjson";
import "./css/Upload.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import KeywordList from "./components/KeywordList";

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'


function App() {
  const [pageCount, setPageCount] = useState(0);
  const [wasUploaded, setWasUploaded] = useState(true);
  let keyWordMap = new Map();
  var slideMap = new Map();
  //const [slidesjson, setSlidejson] = useState([]);

  const handleBackButton = () => {
    setPageCount(pageCount - 1);
  }
  
  const handleNextButton = () => {
    setPageCount(pageCount + 1);
    console.log(start, end);
  }
  
  slidesjson.forEach(element => {
      keyWordMap.set(element.index, [element.timestamp[0], element.timestamp[1]]);
  });

  const [start, setStart] = useState(keyWordMap.get(0)[0]);
  const [end, setEnd] = useState(keyWordMap.get(0)[1]);

  useEffect(() => {
    let timeRange = keyWordMap.get(pageCount);
    setStart(timeRange[0]);
    setEnd(timeRange[1]);
  }, [pageCount]);

  useEffect(() => {
    slidesjson.forEach(element => {
        let i = 0;
        let valueArr = [];
        element.keywords.forEach(word => {
          let mapp = {};
          mapp[word.toString()] = [];
          let arr = element.references[i];
          if (arr[0] === element.index) {
            arr = element.references[i];
          } else {
            arr.forEach(elem => {
              mapp[word.toString()].push(elem);
            });
          }
          if (mapp[word.toString()].length !== 0) {
            valueArr.push(mapp);
          }

          i++;
        });
        slideMap.set(element.index, valueArr);
    });
    console.log(slideMap);
    setKeywords(slideMap.get(pageCount));
  }, [pageCount]);

  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    let ct = slideMap.get(pageCount);
    console.log("page changed", ct, slideMap);
    setKeywords(ct);
  }, [pageCount]);

  const [URL, setURL] = useState("");
  const inputTextHandler = (e) => {
      setURL(e.target.value);
  };
  function sendReq() {
    let baseURL = "http://128.61.16.132:5000/";
    console.log(wasUploaded);
    setWasUploaded(true);
    console.log(wasUploaded);
    // fetch(baseURL, {
    //     method: 'GET', // or 'PUT'
    //     headers: {
    //     'Content-Type': 'application/json',
    //     'videoURL': URL,
    //     'transcribe_audio': 0,
    //     'draw_window': 0
    //     }
    // }).then(response => response.json())
    // .then(data => {
    //   //setSlidejson(data);
    //   setWasUploaded(true);
    // });
}

  return (    
    <Grid container spacing={2}>
      {wasUploaded ? 
        (<>
          <Grid item xs={12}>
            <Box sx={{
                bgcolor: "#181b1f",
                "text-align": "center"
                    }}
            >
                <Button> Home</Button>
                <Button onClick={handleBackButton} disabled={pageCount < 1}>{"<"}</Button>
                <Button onClick={handleNextButton} disabled={pageCount > 13}>{">"}</Button>
            </Box>
        </Grid>
        <Grid item xs={8}>
            <Box sx={{ "text-align": "center" }}>
               <Slide url={"images/image_" + pageCount + ".png"} keywords={keywords} map={slideMap}/>
            </Box>
        </Grid>
        <Grid item xs={4}>
            <Box sx={{
                "text-align": "center",
                    bgcolor: "#181b1f",
                    padding: "10px",
                    border_radius: "10px"}}>
                 <KeywordList list={keywords} map={slideMap}/>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Audio url="audiofile.mp3" start={start} end={end}/>
        </Grid>
        </>): (

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

        )
      }
        
    </Grid>
  );

}

export default App;
