import React from "react";
import s from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
      <>
        <div className={s.block}>
            <p className={s.logo}>Лого</p>
            {/* <Link to="/main">main</Link> */}

        </div>
    </>  
    )
    
}

export default Header;