"use client";
import Header from "./Component/Header";
import UploadVideo from "./Component/UplaodVideo";
import Services from "./Component/Services";
import Tabs from "./Component/Tabs";
import Topbar from "./Component/Topbar.js";
import Questions from "./Tabs/Questions";
import Summarization from "./Tabs/Summarization";
import History from "./Tabs/History";
import { useState } from "react";
import SideBar from "./Component/sideBar";
export default function Home() {
  const [selected, setSelected] = useState("Summarization");
 

  const [isOpen,setIsOpen] = useState (false);

  console.log(summary);


  const getTab = (selectedTab: string) => {
    switch (selectedTab) {
      case "Q&A":
        return <Questions />;
      case "Summarization":
        return <Summarization getSummary={summary} activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} />;
      case "History":
        return <History />;
      default:
        return <div>Select a valid tab</div>;
    }
  };

  console.log(isOpen)

  const SelectedTab = getTab(selected);

  return (
    <div className="scroll-smooth">
      <Header />
      <div className="flex w-full    ">
        <div className= {`flex-none transition-transform duration-300 ${isOpen? " w-1/6 " :"  "}`} >
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          
        </div>
        <div className= {`mt-5 w-[80%] flex-1 mx-auto pr-5 space-y-4  ${isOpen? " w-5/6 " :"   " }`} >
          <UploadVideo />
          <Topbar selcted={selected} setSeleccted={setSelected} />
          {/* <Questions /> */}
          <SelectedTab.type />
          {/* <Tabs /> */}
        </div>
      </div>
    </div>
  );
}
