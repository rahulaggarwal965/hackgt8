import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"

const Slide = ({ url, keywords}) => {
    
    return (
        <div className="slide-and-keywords">
            <img className="current-slide" src={url} alt="A slide" width={"73.5%"} />
            
            {/* <div class="vl" /> */}
            <KeywordList list={keywords}/>
        </div>

    );

};

export default Slide;