import React, { useState } from 'react';

function sideBar( {isOpen, setIsOpen} ) {

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="h-screen flex flex-col w-full mx-auto py-2">
            <div
                className={` p-2 cursor-pointer flex flex-col space-y-1 transition-all duration-300 ${isOpen ? '' : ''}`}
                onClick={toggleMenu}
            >
                <span className={`block h-1 w-8 bg-black rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-1 w-8 bg-black rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-1 w-8 bg-black rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          {/* tabs */}
          <div className= {`  ${isOpen?' flex  w-full h-screen  bg-red-600 transition-transform duration-500 ' : 'hidden'} `}>
             <h1>DocInsight</h1>
 
          </div>

        </div>
    );
}

export default sideBar;
