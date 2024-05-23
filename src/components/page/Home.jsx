import React, { useEffect } from "react";
import Layout from "../Layout.jsx";
import logo from "../../assets/Trash_Back.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                navigate("/main");
            }
        };
        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, []);
    return (
        <div className="">
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.3,
                    scale: {
                        type: "spring",
                        damping: 5,
                    },
                    repeat: Infinity,
                }}
                className="logo flex justify-center"
            >
                <img className="w-3/4" src={logo} alt="" />
            </motion.div>
        </div>
    );
}

export default Home;
