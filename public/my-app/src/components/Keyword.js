import React, { useState } from "react";
import KeywordList from "./KeywordList";
import "../css/Slide.css"
import Modal from "react-modal";
import { Carousel } from '@trendyol-js/react-carousel';
Modal.setAppElement("#root");
const Keyword = ({ word, list}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function toggleModal() {
        setModalIsOpen(!modalIsOpen);
    }
    return (
        <>
            <span className="keyword" onClick={e => toggleModal()}>{word}</span>
            <Modal isOpen={modalIsOpen} onRequestClose={toggleModal} contentLabel={word + " " + Math.random()}>
                <h2>{word}</h2>
                {
                    list ? list.map(element => (
                        <h1>{element}</h1>
                    )) : null
                }

                <button onClick={toggleModal}>Close</button>
            </Modal>
        </>
    );

};

export default Keyword;