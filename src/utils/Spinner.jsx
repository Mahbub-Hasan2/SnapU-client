import React from 'react';
import { useState } from "react";
import { PuffLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Spinner = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gold");

    return (
        <div className="h-[85vh] flex items-center">
            <div className="flex flex-col items-center justify-center text-center w-full">
                <PuffLoader
                    color={color}
                    loading={true}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <h1 className="text-4xl font-bold text-primary mb-5">Loading...</h1>

            </div>
        </div>
    );
};

export default Spinner;