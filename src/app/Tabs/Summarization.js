import React from "react";

function Summarization() {
  const generalQueations = [
    "What is the main theme of the document",
    "Summarize the document in 200 words",
    "What are the key takeaways from the document?",
    "can you provide an analysis of the main arguments",
    "what lessons can be learned from this document?",
    "how does this document relate to recent events?",
  ];
  return (
    <div className="max-w-[80%] mx-auto">
      <div className="grid grid-cols-3  gap-4 ">
        {generalQueations.map((item) => (
          <h1 className="col-span-1 bg-[#525672]  py-3 px-4 rounded-md text-white">
            {item}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default Summarization;
