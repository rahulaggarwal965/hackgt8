import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"

const Slide = ({url}) => {
    
    return (
            <img src={url} alt="A slide"  style={{ maxHeight: "80%" }}/>
    );

};

export default Slide;
