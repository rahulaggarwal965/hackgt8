import React, { useEffect, useState } from "react";
import "../css/KeywordList.css";
import Keyword from "./Keyword";
const KeywordList = ({list, map}) => {
    const[nList, setNList] = useState([[]]);
    useEffect(() => {
        let newList = [];
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            const [key, value] = Object.entries(element);
            console.log(key[0], key[1]);
            newList.push([key[0], key[1]]);
        };
        setNList(newList);
    }, [list]);
    return (
        <>
            <div className="Keyword-List">
                <h1>Keywords</h1>
                <div className="words">
                    {
                        nList.map(element => (
                            <Keyword word={element[0]} list={element[1]} />
                        ))
                    }                    
                </div>
                
            </div>
        </>
    );
};

export default KeywordList;