"use client";
import Image from "next/image";
import React, { useRef } from "react";
import uploadIcon from "../Assets/icons/uploadtocloud1_114846.webp";

function UplaodVideo() {
  const filePickerRef = useRef(null);

  return (
    <div className="max-w-[80%] mx-auto bg-[#1f3e57] h-[250px] text-white flex flex-col items-center justify-center rounded-md space-y-2">
      <Image src={uploadIcon} alt="" className="h-12 w-12 text-white" />
      <button
        onClick={() => filePickerRef.current.click()}
        className="px-2 py-1 text-black bg-white rounded-lg text-xl"
      >
        Upload Video
      </button>
      <input type="file" className="hidden" ref={filePickerRef} />
    </div>
  );
}

export default UplaodVideo;
