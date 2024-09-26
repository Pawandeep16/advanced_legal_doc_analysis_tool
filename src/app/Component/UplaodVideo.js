"use client";
import React, { useRef } from "react";

function UplaodVideo() {
  const filePickerRef = useRef(null);

  return (
    <div className="max-w-[80%] mx-auto bg-[#1f3e57] h-[250px] text-white flex items-center justify-center rounded-md">
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
