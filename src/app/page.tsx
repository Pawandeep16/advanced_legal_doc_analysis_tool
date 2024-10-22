"use client";
import Header from './Component/Header';
import UploadVideo from './Component/UplaodVideo';
import Services from './Component/Services';
import Tabs from "./Component/Tabs";
import Topbar from './Component/Topbar.js';
import Questions from './Tabs/Questions';
import Summarization from './Tabs/Summarization';
import History from './Tabs/History';
import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState('Summarization');
  const [activeQuestion, setActiveQuestion] = useState("");
  const [summary, setSummary] = useState('')

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


  const SelectedTab = getTab(selected);

  return (
    <div className="space-y-6 scroll-smooth">
      <Header />
      <UploadVideo summary={summary} setSummary={setSummary} question={activeQuestion} />
      <Topbar activeTab={selected} setActiveTab={setSelected} />
      {SelectedTab}
    </div>
  );
}
