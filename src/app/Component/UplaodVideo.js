"use client";

import React, { useRef } from "react";
import Lottie from "react-lottie";
import animationData from "../Assets/aniamtion/cloudUpload.json";
import { useSession } from "next-auth/react";
import axios from "axios";

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (!file) {
      console.log("No file selected");
      return;
    }

    // Create form data to send file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send file to backend API using Axios
      const response = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

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
        <input
          type="file"
          className="hidden"
          ref={filePickerRef}
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default UplaodVideo;
