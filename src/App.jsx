import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/page/Home.jsx";
import Main from "./components/page/Main.jsx";
import "./App.css";
import Layout from "./components/Layout.jsx";
import Ending from "./components/page/Ending.jsx";
import Loading from "./components/loading.jsx";

function App() {
    return (
        <div className="h-screen bg-[#E1F0DA] w-screen flex flex-col justify-center items-center overflow-hidden relative">
            <Layout />
            <Routes className=" z-30">
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/end" element={<Ending />} />
                <Route path="/load" element={<Loading />} />
            </Routes>
        </div>
    );
}

export default App;
