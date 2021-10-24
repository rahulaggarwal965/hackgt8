import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"
import Modal from "react-modal";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

Modal.setAppElement("#root");

const Keyword = ({ word, list}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModal() {
        setModalIsOpen(!modalIsOpen);
    }
    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} contentLabel={word + " " + Math.random()}>
                <h2>{word}</h2>
                {
                    list ? list.map(element => (
                        <h1>{element}</h1>
                    )) : null
                }
                <button onClick={toggleModal}>Close</button>
            </Modal>
        
        <ListItem disablePadding>
            <ListItemButton onClick={e => toggleModal()}>
                <ListItemText sx={{ "color": "#b3b3b3" }}primary={word}/>                
            </ListItemButton>
        </ListItem>
        </>
    );

};

export default Keyword;
