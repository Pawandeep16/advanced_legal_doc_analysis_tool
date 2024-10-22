import React from "react";
import Pricing from "../Component/pricing";
import { plans } from "./info";

function PlansComp() {
  return (
    <div className="flex flex-col bg-black relative min-h-screen py-10">
      {/* Heading */}
      <div className="z-10 text-center">
        <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl p-5 lg:p-10">
          Choose the Perfect Plan for Your Needs
        </h1>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-16 lg:gap-20 z-10 mt-5 lg:mt-10">
        {plans.map((plan, index) => (
          <Pricing key={index} {...plan} />
        ))}
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-[#5e066f] opacity-100"></div>
    </div>
  );
}

export default PlansComp;
