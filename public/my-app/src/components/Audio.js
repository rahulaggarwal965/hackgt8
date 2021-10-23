import React, { useState } from "react";
import "../css/Audio.css";

const Audio = ({ url, start, end }) => {
    const audioUrl = `${url}#t=${start},${end}`;
    return (
        <>
            <audio controls className="audio-player">
                <source src={audioUrl} type="audio/mpeg" />
            </audio>
        </>

    );
};

export default Audio;