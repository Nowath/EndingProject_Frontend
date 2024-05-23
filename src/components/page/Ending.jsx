import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../assets/Trash_Back.svg";
import { supabase } from "../../createClient";
import { useLocation } from "react-router-dom";

function Ending() {
    const [time, setTime] = useState(30);
    const [points, setPoints] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const { phoneMorseCode } = location.state || {};

    async function Getdata() {
        const { data, error } = await supabase
            .from("database")
            .select("point")
            .eq("phone", phoneMorseCode);
        setPoints(data[0].point);
    }
    useEffect(() => {
        Getdata();
    }, []);
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                navigate("/");
            }
        };
        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        if (time === 0) {
            clearInterval(intervalId);
            navigate("/");
        }

        return () => clearInterval(intervalId);
    }, [time]);

    if (time === 0) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3 translate-y-[-4rem]">
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                }}
                className="logo flex justify-center items-center z-20"
            >
                <img className=" w-80" src={Logo} alt="" />
            </motion.div>
            <h1 className="text-4xl">Thank You</h1>
            <h1 className="text-2xl">{time}</h1>
            <h1 className="text-2xl flex gap-2 justify-center items-center">
                Your current point:{" "}
                <p className="text-[#789468] text-3xl">{points}</p>
            </h1>
        </div>
    );
}

export default Ending;
