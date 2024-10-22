"use client"
import Header from './Component/Header'
import UploadVideo from './Component/UplaodVideo'
import Services from './Component/Services'
import Tabs from "./Component/Tabs"
import Topbar from './Component/Topbar.js'
import Questions from './Tabs/Questions'
import Summarization from './Tabs/Summarization'
import History from './Tabs/History'
import { useState } from 'react'

export default function Home() {
  const [selected, setSelected] = useState('Summarization')

  const getTab = (selectedTab) => {
    let myTab = <></>;
    switch (selectedTab) {
      case "Q&A":
        return (myTab = <Questions />);
      case "Summarization":
        return (myTab = <Summarization />);
      case "History":
        return (myTab = <History />);
      default:
        return (myTab = <select />);
    }
    return myTab;
  };

  const SelectedTab = getTab(selected)
  return (
    <div className="space-y-6 scroll-smooth">
      <Header />
      <UploadVideo />
      <Topbar selcted={selected} setSeleccted={setSelected} />
      {/* <Questions /> */}
      <SelectedTab.type />
      {/* <Tabs /> */}
    </div>
  );
}