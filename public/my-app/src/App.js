import React from "react";
import Audio from "./components/Audio";
import Slide from "./components/Slide";
import "./App.css"
function App() {
  return (
    <div className="App">
      <div>
        <div className="header"></div>
      </div>
      
      <Slide url="https://wallpaperaccess.com/full/109666.jpg" />
      <div className="audio-footer">
        <Audio url="https://freesound.org/data/previews/593/593675_9034501-lq.mp3" start="200" end="210"/>
      </div>
      

      
    </div>
  );
}

export default App;
