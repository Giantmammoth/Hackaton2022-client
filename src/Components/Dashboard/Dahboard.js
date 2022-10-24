import React from "react";
import PrivateBook from "../book/PrivateBook";
import PublicBook from "../book/PublicBook";
import Footer from "../Footer/Footer";
function Dashboard() {
    return (
        <>
        <PublicBook/>
        <PrivateBook/>
        <Footer/>
        </>
    )
}

export default Dashboard