import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"
import Modal from "react-modal";
Modal.setAppElement("#root");
const Keyword = ({ word, list}) => {
    const [isModalOn, setIsModalOn] = useState(false);
    return (
        <>
            <span className="keyword" onClick={e => console.log(list)}>{word}</span>
        </>

    );

};

export default Keyword;