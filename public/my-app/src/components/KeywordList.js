import React, { useState } from "react";
import "../css/KeywordList.css";
const KeywordList = ({list}) => {
    return (
        <>
            <div className="Keyword-List">
                <h1>Keywords</h1>
                <div className="donotshow">
                    <span className="noshow">rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</span>
                    <span className="noshow">rrrrr</span>
                    <span className="noshow">rrrrr</span>
                    <span className="noshow">rrrr</span>
                    <span className="noshow">rrrr</span>
                </div>
                <div className="words">
                    {
                        list.forEach(word => {
                            <span className="keyword" onClick={e => console.log("keyword clicked")}>{word}</span>
                        })
                    }
                    <span className="keyword" onClick={e => console.log("keyword clicked")}>Electron Transport Chain</span>
                    <span className="keyword" onClick={e => console.log("keyword clicked")}>Supply Transport Chain</span>
                    <span className="keyword" onClick={e => console.log("keyword clicked")}>Mcgrahill Chain</span>
                    <span className="keyword" onClick={e => console.log("keyword clicked")}>Two Chain</span>
                </div>
                
            </div>
        </>
    );
};

export default KeywordList;