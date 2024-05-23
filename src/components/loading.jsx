import React from "react";
import { PropagateLoader } from "react-spinners";

function loading() {
    return (
        <div className="backdrop-blur-sm w-full h-full z-30 flex justify-center items-center">
            <PropagateLoader color="#99BC85" size={20} />
        </div>
    );
}

export default loading;
