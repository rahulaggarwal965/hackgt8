import React, { useState } from "react";
import "../css/Header.css"
const Header = () => {
    return (
        <div>
            <div className="header">
                <button>Home</button>
                <button className="back-btn">{"<"}</button>
                <button className="next-btn">{">"}</button>
            </div>
        </div>
    );
};

export default Header;