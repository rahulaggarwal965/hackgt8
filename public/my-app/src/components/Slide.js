import React, { useState } from "react";
import "../css/Slide.css"

const Slide = ({ url}) => {
    return (
        <div className="slide-and-keywords">
            <img className="current-slide" src={url} alt="A slide" width={1920/1.5} height={1080/1.5} />
            <div class="vl" />
        </div>

    );
};

export default Slide;