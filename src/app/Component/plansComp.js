import React from "react";
import Pricing from "../Component/pricing"
import { plans } from "./info";
function plansComp() {
  return (
    <div className=" flex flex-col bg-black relative h-screen my-auto  ">
      <div className="z-10 ">
        <h1 className="text-white font-bold text-9xl p-10 mt-10  ">
          Choose the Perfect Plan for Your Needs
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-20 z-10 mt-10">
        {plans.map((plan, index) => (
          <Pricing key={index} {...plan} />
        ))}
      </div>
        <div className=" absolute inset-0 bg-gradient-to-b from-black via-black/20 to-[#5e066f] opacity-100 "> </div>
    </div>
  );
}

export default plansComp;
