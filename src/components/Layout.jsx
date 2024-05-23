import React from "react";
import logo from "../assets/Trash_Back.svg";
import bottle from "../assets/Bottleee.svg";
import Wave from "react-wavify";

function Layout() {
    return (
        <div className="h-full flex flex-col justify-between absolute z-10">
            <div className="wave w-full rotate-180">
                <Wave
                    fill="#BFD8AF"
                    paused={false}
                    className="translate-x-[-3rem] rotate-12 w-[140%!important] absolute left-0 bottom-0"
                    options={{
                        height: 50,
                        amplitude: 50,
                        speed: 0.25,
                        points: 2,
                    }}
                />
                <Wave
                    fill="#99BC85"
                    paused={false}
                    className="translate-y-20 translate-x-[-4rem] rotate-[16deg] w-[120%]"
                    options={{
                        height: 15,
                        amplitude: 20,
                        speed: 0.25,
                        points: 3,
                    }}
                />
            </div>
            <footer className="w-screen relative">
                {/* <img
                    className=" scale-150 translate-y-20"
                    src={bottle}
                    alt=""
                /> */}
                <div className="wave w-full">
                    <Wave
                        fill="#BFD8AF"
                        paused={false}
                        className="translate-x-[-3rem] rotate-12 w-[140%!important] absolute left-0 bottom-0"
                        options={{
                            height: 50,
                            amplitude: 50,
                            speed: 0.25,
                            points: 2,
                        }}
                    />
                    <Wave
                        fill="#99BC85"
                        paused={false}
                        className="translate-y-20 translate-x-[-4rem] rotate-[16deg] w-[120%]"
                        options={{
                            height: 15,
                            amplitude: 20,
                            speed: 0.25,
                            points: 3,
                        }}
                    />
                </div>
            </footer>
        </div>
    );
}

export default Layout;
