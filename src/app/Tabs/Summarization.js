"use client";

import React from "react";

function Summarization({ activeQuestion, setActiveQuestion, getSummary }) {
  const generalQuestions = [
    "What is the main theme of the document",
    "Summarize the document in 10 words",
    "What are the key takeaways from the document?",
    "Can you provide an analysis of the main arguments?",
    "What lessons can be learned from this document?",
    "How does this document relate to recent events?",
  ];

  const handleActiveQuestion = (item) => {
    if (typeof setActiveQuestion === "function") {
      setActiveQuestion(item);
    } else {
      console.error("setActiveQuestion is not a function");
    }
  };

  return (
    <div className="max-w-[80%] mx-auto space-y-4">
      <div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2  gap-4 ">
        {generalQuestions.map((item) => (
          <h1
            key={item}
            onClick={() => handleActiveQuestion(item)}
            className={`col-span-1 bg-[#525672]  py-3 px-4 rounded-md text-white cursor-pointer ${
              activeQuestion === item ? "font-semibold text-lg" : ""
            }`}
          >
            {item}
          </h1>
        ))}
      </div>
      <div className="bg-[#525672]  w-full px-2 py-4 rounded-md">
        <h1 className="text-white text-lg ">
          {getSummary}
        </h1>
      </div>
    </div>
  );
}

export default Summarization;