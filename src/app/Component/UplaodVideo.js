"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const { data: session, status } = useSession();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (!file) {
      console.log("No file selected");
      return;
    }

    setLoading(true); // Show loading state

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("file", file); // Key should match what backend expects, here it's 'file'

      // Send the file as form data to the backend API
      const response = await axios.post(
        "http://localhost:3000/api/summarize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      // Log the complete response for debugging
      console.log("Full response:", response.data.summary);

      // Set the returned summary if present
      setSummary(response.data.summary); // Assuming OpenAI API returns a summary in choices[0].message.content
    } catch (error) {
      console.error("Error summarizing document:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

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
      <div className="bg-[#2e324c] p-4  h-[200px] rounded-lg">
        <div className=" bg-[#222949] h-full text-white flex items-center justify-center rounded-md flex-col border border-dashed border-gray-400">
          <Lottie options={defaultOptions} height={100} width={100} />
          <button
            onClick={() => filePickerRef.current.click()}
            className="px-4 py-1 text-white bg-[#525672] rounded-lg text-lg mt-2"
          >
            Choose file
          </button>
          <input
            type="file"
            className="hidden"
            ref={filePickerRef}
            onChange={handleFileUpload}
          />
          {/* Display Loading State */}
          {loading && (
            <p className="text-white mt-4">Summarizing document...</p>
          )}
          {/* Display Summary */}
        </div>
      </div>
      {summary && (
        <div className="bg-white text-black p-4 mt-4 rounded-lg">
          <h3 className="text-lg font-bold">Document Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default UplaodVideo;
