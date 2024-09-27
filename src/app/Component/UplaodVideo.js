"use client";

import React, { useRef } from "react";
import Lottie from 'react-lottie';
import animationData from '../Assets/aniamtion/cloudUpload.json';

function UplaodVideo() {
  
  const defaultOptions = {
    loop: false,
    
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const filePickerRef = useRef(null);

 

  return (
    <div className="max-w-[80%] mx-auto bg-[#1f3e57] h-[250px] text-white flex items-center justify-center rounded-md flex-col p-10">
       <Lottie options={defaultOptions} height={400} width={400} />
      <button
        onClick={() => filePickerRef.current.click()}
        className="px-2 py-1 text-black bg-white rounded-lg text-xl mt-2"
      >
        Upload Document
      </button>
      <input type="file" className="hidden" ref={filePickerRef} />
    </div>
  );
}

export default UplaodVideo;
