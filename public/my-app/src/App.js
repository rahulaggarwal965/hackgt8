import React, {useState} from "react";
import Audio from "./components/Audio";
import Slide from "./components/Slide";
import Header from "./components/Header";
import "./App.css"
function App() {
  const [pageCount, setPageCount] = useState(0);

  const handleBackButton = () => {
    setPageCount(pageCount - 1);
  }
  
  const handleNextButton = () => {
    setPageCount(pageCount + 1);
  }

  const temp = {
    "slides": [
        {
            "index": 0,
            "image": "image_0.png",
            "timestamp": [
              0.0,
              48.266666666666666
            ],
            "audio_transcript": "",
            "paragraphs": [
              "BIO 210 Anatomy & Physiology",
              "Chapter 4 Video 4",
              "Cellular Respiration",
              "Slides 19-30",
              "Professor Mark Fandel",
              " ",
              ""
            ],
            "keywords": [
              "chapter 4 video 4",
              "professor mark fandel",
              "bio 210 anatomy",
              "slides 19",
              "cellular respiration",
              "physiology",
              "30"
            ]
          },
          {
            "index": 1,
            "image": "image_1.png",
            "timestamp": [
              48.266666666666666,
              48.8
            ],
            "audio_transcript": "",
            "paragraphs": [
              "Because learning changes everything.\u00ae",
              "  ",
              "2022 \u00a9 McGraw Hil LLC. No reproduction of the prior witen consent of McGraw LLC."
            ],
            "keywords": [
              "2022 \u00a9 mcgraw hil llc",
              "learning changes everything .\u00ae",
              "prior witen consent",
              "mcgraw llc",
              "reproduction"
            ]
          },
          {
            "index": 2,
            "image": "image_2.png",
            "timestamp": [
              48.8,
              149.63333333333333
            ],
            "audio_transcript": "",
            "paragraphs": [
              "4.4 Cellular Respiration .",
              "Cellular Respiration of glucose occurs in 3 interconnected",
              "reaction sequences:",
              "Glycolysis (anaerobic)",
              "Citric acid cycle (aerobic)",
              "Electron transport chain/oxidative phosphorylation",
              "(aerobic)",
              "Glycolysis and the Electron Transport Chain are stepwise",
              "reaction sequences",
              "Citric Acid Cycle occurs in a metabolic cycle in which the",
              "final product reacts to replenish original substrate",
              "  "
            ],
            "keywords": [
              "citric acid cycle occurs",
              "citric acid cycle",
              "replenish original substrate",
              "final product reacts",
              "electron transport chain",
              "4 cellular respiration",
              "metabolic cycle",
              "glucose occurs",
              "cellular respiration",
              "reaction sequences",
              "oxidative phosphorylation",
              "3 interconnected",
              "4",
              "stepwise",
              "glycolysis",
              "anaerobic",
              "aerobic"
            ]
          }
    ]
  };

  let keyWordMap = new Map();
  temp.slides.forEach(element => {
    element.forEach(word => {
      if (keyWordMap.has(word)) {
        keyWordMap.set(word, [element.index]);
      } else {
        keyWordMap.set(word, [element.index]);
      }
    });
  });

  return (
    <div className="App">
        <div className="header">
            <button>Home</button>
            <button className="back-btn" onClick={handleBackButton} disabled={pageCount < 1}>{"<"}</button>
            <button className="next-btn" onClick={handleNextButton} disabled={pageCount > 20}>{">"}</button>
        </div>
      
      {/* <Slide url="https://wallpaperaccess.com/full/109666.jpg" /> */}
      <Slide url={"../../../data/4 Cellular respiration slides 19-30-tUVjJ8ak3LU/images/image_" + pageCount + ".png"}  />

      <div className="audio-footer">
        <Audio url="https://freesound.org/data/previews/593/593675_9034501-lq.mp3" start="200" end="210"/>
      </div>
      
    </div>
  );
}

export default App;
