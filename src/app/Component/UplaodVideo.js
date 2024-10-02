"use client";

import React, { useRef } from "react";
import Lottie from "react-lottie";
import animationData from "../Assets/aniamtion/cloudUpload.json";
import { useSession } from "next-auth/react";

function UplaodVideo() {
  const defaultOptions = {
    loop: false,

    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const filePickerRef = useRef(null);

  const { data: session, status } = useSession();

  console.log({ session });
  return (
    <div className="bg-[#1f3e57] p-4 max-w-[80%] mx-auto h-[250px] rounded-lg">
      <div className=" bg-[#1e265350] h-full text-white flex items-center justify-center rounded-md flex-col border border-dashed border-gray-400">
        <Lottie options={defaultOptions} height={100} width={100} />
        <button
          onClick={() => filePickerRef.current.click()}
          className="px-4 py-1 text-black bg-white rounded-lg text-lg mt-2"
        >
          Upload Document
        </button>
        <input type="file" className="hidden" ref={filePickerRef} />
      </div>
    </div>
  );
}

export default UplaodVideo;
