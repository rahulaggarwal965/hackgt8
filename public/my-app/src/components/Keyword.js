import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"
import Modal from "react-modal";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

Modal.setAppElement("#root");

const Keyword = ({ word, list}) => {
    const [isModalOn, setIsModalOn] = useState(false);
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={e => console.log(list)}>
                <ListItemText sx={{ "color": "#b3b3b3" }}primary={word}/>                
            </ListItemButton>
        </ListItem>
    );

};

export default Keyword;
