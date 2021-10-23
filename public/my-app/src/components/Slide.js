import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"

const Slide = ({ url, keywords}) => {

    return (
        <div className="slide-and-keywords">
            <img className="current-slide" src={url} alt="A slide"  style={{ maxHeight: "80%" }} />
            {/* bruh who thhis fool in front of us */}
            {/* <div class="vl" /> */}
            <KeywordList list={keywords}/>
        </div>

    );

};

export default Slide;