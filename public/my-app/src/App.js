import React, {useState} from "react";
import Audio from "./components/Audio";
import Slide from "./components/Slide";
import Header from "./components/Header";
import "./App.css"
function App() {
  const [pageCount, setPageCount] = useState(1);

  const handleBackButton = () => {
    setPageCount(pageCount - 1);
  }
  const handleNextButton = () => {
    setPageCount(pageCount + 1);
  }
  return (
    <div className="App">
        <div className="header">
            <button>Home</button>
            <button className="back-btn" onClick={handleBackButton} disabled={pageCount < 2}>{"<"}</button>
            <button className="next-btn" onClick={handleNextButton} disabled={pageCount > 20}>{">"}</button>
        </div>
      
      <Slide url="https://wallpaperaccess.com/full/109666.jpg" />

      <div className="audio-footer">
        <Audio url="https://freesound.org/data/previews/593/593675_9034501-lq.mp3" start="200" end="210"/>
      </div>
      
    </div>
  );
}

export default App;
