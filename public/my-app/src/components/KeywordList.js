import React, { useEffect, useState } from "react";
import "../css/KeywordList.css";
import Keyword from "./Keyword";


import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { FixedSizeList } from 'react-window';


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

    function renderRow(props) {
      const { index, style } = props;
      return (
          <Keyword word={nList[index][0]} list={nList[index][1]}/>
      )
    }

    return (
        <>
        <Typography sx={{ fontSize: 40, color: "#b3b3b3" }}>
            Keywords
        </Typography>
        <FixedSizeList
            height={650}
            itemSize={36}
            itemCount={nList.length}
            overscanCount={0}
        >
        {renderRow}
        </FixedSizeList>
        </>
    );
};

export default KeywordList;
