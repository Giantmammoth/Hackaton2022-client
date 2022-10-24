import React from 'react'
import Accueil from '../../Components/Accueil/Barnav'
import AccueilLibrairie from '../../Components/Accueil/AccueilLibrairie'
import AccueilSlogan from '../../Components/Accueil/AccueilSlogan'
import Footer from '../../Components/Footer/Footer'

function AccueilPage() {
    return(
        <div>
            <div className='navbarContainer'>
                <div className='navbarBackground'>
                    <Accueil/>
                    <AccueilSlogan/>
                </div>
            </div>
            <AccueilLibrairie/>
            <Footer/>
        </div>
        
        )
}

export default AccueilPage