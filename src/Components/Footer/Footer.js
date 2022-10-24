import React from "react";
import { ReactComponent as Logo } from "../../Assets/Logo/E-BOSSY.svg"
import './Footer.css'
function Footer() {
    return(
        <div className="footer">
            <Logo className="logo" style = {{marginLeft : '82vh'}}></Logo>
            <span style={{color: 'white', marginLeft : '100vh'}}>&copy; Giantmammoth 2022</span >
        </div>
    )
}

export default Footer