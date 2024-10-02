import React from "react";
import Services from "./Services";

function Tabs() {
  const tabs = ["Services", "Services", "Services"];
  return (
    <div className="max-w-[80%] mx-auto  px-4 text-[#111] text-4xl font-semibold space-y-8">
      <h1 className="text-center">Services</h1>
      <Services />
    </div>
  );
}

export default Tabs;
