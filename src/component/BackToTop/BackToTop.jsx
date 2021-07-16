import React from 'react';
import { useState } from 'react';
import "./style.css";

const BackToTop = () => {
    const [showComp, setComp] = useState(false);

    const gotToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) setComp(true);
        else setComp(false);
    });

    return <>
        {
            showComp &&
            <div onClick={gotToTop} className="position-fixed cursor-pointer w-full z-50 flex justify-content-center items-center back-to-top" style={{ top: "4rem" }}>
                <div className="flex justify-content-center align-items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                    <span>Back To Top</span>
                    <i className="fa fa-arrow-up ml-2"></i>
                </div>
            </div>
        }
    </>
}

export default BackToTop;
