import React, { useState, useEffect } from "react";
import KeywordList from "./KeywordList";
import Modal from "react-modal";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button } from "@mui/material";

Modal.setAppElement("#root");

const Keyword = ({ word, list}) => {
    const [pc, setPc] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleBackButton = () => {
        setPc((pc - 1) % list.length);
    }

    const handleNextButton = () => {
        setPc((pc + 1) % list.length);
    }

    function toggleModal() {
        setModalIsOpen(!modalIsOpen);
    }

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        if (list) {
            list.forEach(element => {
                let temp = imageList;
                let url = "images/image_" + element + ".png";
                temp.push(url);
                setImageList(temp);
            });
        }
        
    }, []);

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} contentLabel={word + " " + Math.random()}>
                <h2 className="word-header">{word}</h2>
                <Button onClick={handleBackButton}>{"<"}</Button>
                <Button onClick={handleNextButton}>{">"}</Button>
                {
                    imageList ? (<img src={imageList[pc]} alt="A slide"  style={{ maxHeight: "80%" }}/>) : null
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
