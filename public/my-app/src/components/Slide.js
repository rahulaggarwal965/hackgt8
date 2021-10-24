import React, { useState } from "react";
import KeywordList from "./KeywordList";

const Slide = ({url}) => {
    
    return (
            <img src={url} alt="A slide"  style={{ maxHeight: "80%" }}/>
    );

};

export default Slide;
