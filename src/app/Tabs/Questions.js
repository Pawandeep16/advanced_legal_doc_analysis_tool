"use client";
import React, { useState } from "react";

function Questions({ input, setInput, handleFileUpload, save, myChat }) {
  const [chatField, setChatField] = useState(false);

  return (
    <div className="max-w-[80%] mx-auto space-y-10 ">
      {myChat.length > 0 && (
        <div className="w-full max-h-[300px] bg-[#525672] overflow-y-scroll">
          {myChat.map((item, i) => (
            <div key={i} className=" px-4 space-y-4 py-4 w-full">
              <div className="w-full flex justify-start ">
                <p className="max-w-[250px] bg-gray-400 px-4 py-2 rounded-md">
                  {item.question}
                </p>
              </div>
              <div className="w-full flex justify-end ">
                <p className="max-w-[500px] bg-blue-500 px-4 py-2 rounded-md">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-3">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ask Question"
          className="px-2 py-3 flex-1 w-full border border-gray-500 rounded-md outline-none"
        />
        <button
          onClick={() => {
            handleFileUpload();
          }}
          className="bg-[#525672] w-full text-white rounded-md px-2 py-3"
        >
          Submit
        </button>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Chat Log Title"
            className="border border-gray-500 outline-none p-2 rounded-md"
          />
          <button
            onClick={save}
            className="p-2 bg-[#525672] text-white rounded-md"
          >
            Save Chat Log
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
