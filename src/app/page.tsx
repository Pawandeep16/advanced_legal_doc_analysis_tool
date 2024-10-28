"use client";
import Header from './Component/Header';
import UploadVideo from './Component/UplaodVideo';
import Topbar from './Component/Topbar.js';
import Questions from './Tabs/Questions';
import Summarization from './Tabs/Summarization';
import History from './Tabs/History';
import { useEffect, useState } from 'react';
import SideBar from "../app/Component/sideBar"
import axios from 'axios';
export default function Home() {


  type Chat = {
    question: string;
    answer: string;
  };

  const [selected, setSelected] = useState("Summarization");
  const [activeQuestion, setActiveQuestion] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myChat, setMyChat] = useState<Chat[]>([]);
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState('')

  const handleSaveChat = () => {
    setActiveQuestion("");
    setFile(null);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    setLoading(true); // Show loading state
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("file", file); // Key should match what backend expects
      formData.append("question", activeQuestion); // Replace with actual question if needed

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
      setSummary(response.data.summary);
      setMyChat((d) => [
        ...d,
        { question: activeQuestion, answer: response.data.summary },
      ]);
    } catch (error) {
      console.error("Error summarizing document:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    const myToken = localStorage.getItem('user')
    setToken(myToken)
  }, [])

  console.log(token);


  const getTab = (selectedTab: string) => {
    switch (selectedTab) {
      case "Q&A":
        return (
          <Questions
            setInput={setActiveQuestion}
            handleFileUpload={handleFileUpload}
            save={handleSaveChat}
            myChat={myChat}
          />
        );
      case "Summarization":
        return (
          <Summarization
            handleFileUpload={handleFileUpload}
            save={handleSaveChat}
            getSummary={summary}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
          />
        );
      case "History":
        return <History />;
      default:
        return <div>Select a valid tab</div>;
    }
  };


  const SelectedTab = getTab(selected);

  return (
    <div className="scroll-smooth">
      <Header />
      <div className="flex w-full    ">
        <div className={`flex-none transition-transform duration-300 mr-2 ${isOpen ? " w-1/6 " : "  "}`} >
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
        <div className={`mt-5  flex-1 pr-5 space-y-4  ${isOpen ? " w-5/6 " : "   "}`} >
          <UploadVideo selectedFile={file} setSelectedFile={setFile} loading={loading} />
          <Topbar activeTab={selected} setActiveTab={setSelected} />

          {SelectedTab}

        </div>
      </div>
    </div>
  );
}
