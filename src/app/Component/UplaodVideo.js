"use client";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../Assets/aniamtion/cloudUpload.json";
import { useSession } from "next-auth/react";
import axios from "axios";
import pdfIcon from "../Assets/icons/Pdficon.png";
import wordIcon from "../Assets/icons/wordicon.png";
import Image from "next/image";

function UplaodVideo({ selectedFile, setSelectedFile, loading, setLoading }) {
  const defaultOptions = {
    loop: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const filePickerRef = useRef(null);
  const [fileExtention, setFileExtention] = useState([]);

  const [user, setUser] = useState();
  const { data: session, status } = useSession();

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file); // Store the selected file in state
      console.log("File selected:", file);
      setFileExtention(file.name.split("."));
    } else {
      console.log("No file selected");
    }
  };

  const getFileExtention = (selectedFileExtention) => {
    switch (selectedFileExtention) {
      case "docx":
        return <Image src={wordIcon} alt="" height={30} width={30} />;
      case "pdf":
        return <Image src={pdfIcon} alt="" height={30} width={30} />;
      default:
        return;
    }
  };

  const myExtention = getFileExtention(fileExtention[1]);

  const userString = localStorage.getItem("user"); // Get the JSON string from localStorage

  const getUserById = async () => {
    if (userString) {
      // Parse the string into an object
      const userDetail = JSON.parse(userString);
      try {
        await axios
          .get(`http://localhost:5000/api/user/getuser/${userDetail.id}`)
          .then((data) => {
            setUser(data.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div>
      <div className="bg-[#2e324c] p-4 max-w-[80%] mx-auto h-[200px] rounded-lg">
        <div className=" bg-[#222949] h-full text-white flex items-center justify-center rounded-md flex-col border border-dashed border-gray-400 relative space-y-2">
          {!selectedFile ? (
            <>
              <Lottie options={defaultOptions} height={100} width={100} />
              <button
                onClick={() => filePickerRef.current.click()}
                className="px-4 py-1 text-white bg-[#525672] rounded-lg text-lg mt-2"
              >
                Choose file
              </button>
            </>
          ) : (
            <>
              {myExtention}
              <p>{selectedFile?.name}</p>
            </>
          )}

          <input
            type="file"
            className="hidden"
            ref={filePickerRef}
            onChange={handleFileChange}
          />
          {loading && <p className="text-white mt-4">Scanning document...</p>}
        </div>
      </div>
    </div>
  );
}

export default UplaodVideo;