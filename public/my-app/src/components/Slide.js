import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"

const Slide = ({ url, keywords, map}) => {
    
    return (
        <div className="slide-and-keywords">
            <img className="current-slide" src={url} alt="A slide"  style={{ maxHeight: "80%" }} onClick={e => console.log(keywords)} />
            {/* bruh who thhis fool in front of us */}
            {/* <div class="vl" /> */}
            
            <KeywordList list={keywords} map={map}/>
        </div>

    );

};

export default Slide;