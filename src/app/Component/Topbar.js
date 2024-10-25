import React from "react";

function Topbar({ activeTab, setActiveTab }) {
  const tabs = ["Summarization", "Q&A", "History"];

  return (
    <div className=" bg-[#1d2146] flex  items-center justify-around px-1 py-2 max-w-[80%] mx-auto">
      {tabs.map((item, i) => (
        <h1
          key={i}
          onClick={() => setActiveTab(item)}
          className={`hover:bg-[#233552] min-w-[30%] rounded-md cursor-pointer text-center text-white py-1 px-3  text-lg ${
            activeTab === item && "font-semibold bg-[#233552]"
          }`}
        >
          {item}
        </h1>
      ))}
    </div>
  );
}

export default Topbar;
