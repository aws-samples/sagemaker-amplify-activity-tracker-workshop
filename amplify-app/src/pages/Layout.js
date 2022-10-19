import React from "react";
import {Outlet} from "react-router-dom";
import Banner from "../Banner";
import Navbar from "../Navbar";

const Layout = () => {
    return (<>
        <Banner/>
        <Outlet/>
        <Navbar/>
    </>);
};

export default Layout;
