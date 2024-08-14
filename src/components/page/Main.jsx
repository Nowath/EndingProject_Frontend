import React, { useState, useEffect } from "react";
import Logo from "../../assets/Trash_Back.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTrashRestore } from "react-icons/fa";
import MorseCode from "../MorseCode";
import { supabase } from "../../createClient";
import axios from "axios";

function Main() {
    const [phone, setPhone] = useState("");
    let [counter, setCounter] = useState(0);
    const [newCount, setNewCount] = useState(0);
    const [error, setError] = useState(
        "Phone number must be at least 10 digits."
    );
    const [phoneMorse, setPhoneMorse] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data, error } = await supabase
                    .from("database")
                    .select("*");
                if (error) throw error;
                const phones = data.map((user) => user.phone);
                setPhoneMorse(phones);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000");
        ws.onmessage = (event) => {
            let num = parseInt(event.data);
            setCounter(num);
            setNewCount((counter += num));
        };
        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = async (event) => {
            if (event.key === "Enter") {
                if (phone == "") {
                    navigate("/");
                } else if (phone.length >= 10) {
                    const phoneMorseCode = MorseCode(phone);
                    if (phoneMorse.includes(phoneMorseCode)) {
                        await updateUser(phoneMorseCode);
                    } else {
                        await createUser(phoneMorseCode);
                    }
                    navigate("/end", { state: { phoneMorseCode } });
                } else {
                    setError("Phone number must be at least 10 digits.");
                }
            }
        };

        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [phone, phoneMorse, counter, navigate]);

    const createUser = async (phoneMorseCode) => {
        try {
            const { data, error } = await supabase
                .from("database")
                .insert([{ phone: phoneMorseCode, point: newCount }])
                .select();
            if (error) throw error;
            console.log("User created:", data);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const updateUser = async (phoneMorseCode) => {
        try {
            const { data, error } = await supabase.rpc("increment", {
                col_name: "point",
                increment_value: newCount,
                phone_morse: phoneMorseCode,
            });
            if (error) throw error;
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="flex flex-col justify-around items-center relative h-full z-20">
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="logo flex justify-center items-center z-20"
            >
                <img className=" w-80" src={Logo} alt="Logo" />
            </motion.div>
            <div className="flex flex-col gap-4 items-center">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-2xl text-[#5e8d42]"
                >
                    Phone Number
                </motion.h1>
                <motion.input
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    type="number"
                    className="w-72 p-2 rounded-xl focus:outline-[#99BC85]"
                    onChange={(e) => {
                        const { value } = e.target;
                        setPhone(value);

                        if (value.length < 10) {
                            setError("Phone number must be at least 10 digits");
                        } else {
                            setError(null);
                        }
                    }}
                    placeholder="Phone Number"
                    autoFocus
                />
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-red-600"
                >
                    {error}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="counter flex flex-col justify-center items-center mt-5"
                >
                    <div className="inset mb-2 flex gap-1 justify-center items-center">
                        <FaTrashRestore size={20} />
                        <h2 className="text-2xl">ใส่ขยะของคุณ</h2>
                    </div>
                    <h1 className="text-2xl">Counter</h1>
                    <h1 className="text-[4rem]">{newCount}</h1>
                </motion.div>
            </div>
            <footer className="h-40"></footer>
        </div>
    );
}

export default Main;
