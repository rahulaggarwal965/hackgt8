import React, {useState, useEffect} from "react";
import Audio from "./components/Audio";
import Slide from "./components/Slide";
import Header from "./components/Header";
import "./App.css";
import slidesjson from "./components/slidesjson";
function App() {
  const [pageCount, setPageCount] = useState(0);
  let keyWordMap = new Map();

  const handleBackButton = () => {
    setPageCount(pageCount - 1);
  }
  
  const handleNextButton = () => {
    setPageCount(pageCount + 1);
    console.log(keyWordMap);
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
    console.log("used");
  }, [pageCount]);

  return (
    <div className="App">
        <div className="header">
            <button>Home</button>
            <button className="back-btn" onClick={handleBackButton} disabled={pageCount < 1}>{"<"}</button>
            <button className="next-btn" onClick={handleNextButton} disabled={pageCount > 13}>{">"}</button>
        </div>
      
      {/* <Slide url="https://wallpaperaccess.com/full/109666.jpg" /> */}
      <Slide url={"images/image_" + pageCount + ".png"} keywords={"jj"}  />

      <div className="audio-footer">
        <Audio url="audiofile.mp3" start={start} end={end}/>
      </div>
      
    </div>
  );
}

export default App;
