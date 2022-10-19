import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Permission from "./pages/Permission";
import Record from "./pages/Record";
import Licenses from "./pages/Licenses";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (<BrowserRouter>
    <Routes>
        <Route path="/"
            element={<Layout/>}>
            <Route index
                element={<Home/>}/>
            <Route path="permission"
                element={<Permission/>}/>
            <Route path="record"
                element={<Record/>}/>
            <Route path="licenses"
                element={<Licenses/>}/>
            <Route path="*"
                element={<Home/>}/>
        </Route>
    </Routes>
</BrowserRouter>);
