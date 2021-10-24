import React, {useState, useEffect, useMemo} from "react";
import Audio from "./components/Audio";
import Slide from "./components/Slide";
import "./App.css";
import slidesjson from "./components/slidesjson";
import "./css/Upload.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
function App() {
  const [pageCount, setPageCount] = useState(0);
  const [wasUploaded, setWasUploaded] = useState(false);
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
    <div className="App">
      <>
      {wasUploaded ? 
        (
        <>
          <div className="header" onClick={e => console.log("map2[pageCount]")}>
          <button>Home</button>
          <button className="back-btn" onClick={handleBackButton} disabled={pageCount < 1}>{"<"}</button>
          <button className="next-btn" onClick={handleNextButton} disabled={pageCount > 13}>{">"}</button>
      </div>

      <Slide url={"images/image_" + pageCount + ".png"} keywords={keywords} map={slideMap}  />

      <div className="audio-footer">
        <Audio url="audiofile.mp3" start={start} end={end}/>
      </div>
        </>
        ): (

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
      </>
    </div>
    
  );

}

export default App;
