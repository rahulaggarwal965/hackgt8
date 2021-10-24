import React, {useState, useEffect, useMemo} from "react";
import Audio from "./components/Audio";
import Slide from "./components/Slide";
import Header from "./components/Header";
import "./App.css";
import slidesjson from "./components/slidesjson";
function App() {
  const [pageCount, setPageCount] = useState(1);
  let keyWordMap = new Map();
  var slideMap = new Map();

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
    //console.log(slideMap.get(pageCount), "******************* ", pageCount, slideMap.size);
    //setKeywords(slideMap.get(pageCount));
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
    //console.log(slideMap.get(pageCount));
    //console.log(keywords);
    //setKeywords(slideMap.get(pageCount));
    //console.log(keywords);
  }, [pageCount]);

  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    let ct = slideMap.get(pageCount);
    console.log("page changed", ct, slideMap);
    setKeywords(ct);
  }, [pageCount]);



  // useEffect(() => {
  //   setMap2(Object.fromEntries(slideMap));
  //   let nnn = Object.fromEntries(slideMap);
  //   console.log(Object.fromEntries(slideMap), "^^^^^^^^^^^^^^^");
  //   setMap2(nnn);
  // }, [pageCount]);

  return (
    <div className="App">
      <div className="header" onClick={e => console.log("map2[pageCount]")}>
          <button>Home</button>
          <button className="back-btn" onClick={handleBackButton} disabled={pageCount < 1}>{"<"}</button>
          <button className="next-btn" onClick={handleNextButton} disabled={pageCount > 13}>{">"}</button>
      </div>

      <Slide url={"images/image_" + pageCount + ".png"} keywords={keywords} map={slideMap}  />

      <div className="audio-footer">
        <Audio url="audiofile.mp3" start={start} end={end}/>
      </div>
      
    </div>
  );
}

export default App;
