import React, { useState } from "react";
import "../css/Header.css"
const Header = () => {
    return (
        <div>
            <div className="header">
                <button>Home</button>
                <button>{"<"}</button>
                <button>{">"}</button>
            </div>
        </div>
    );
};

export default Header;