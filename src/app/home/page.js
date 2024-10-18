import React from "react";
import Header from "../Component/Header";
import image from "../Assets/icons/banner.png";
import Image from "next/image";
import About from "../Component/About";
import Information from "../Component/Information";
import Pricing from "../Component/pricing";
import { components } from "../Component/info";

function Homepage() {
  return (
    <div className="flex flex-col scroll-smooth">
      <Header className=" z-60 " />
      <div className="relative ">
        <div className="h-screen">
          <Image
            className=" w-[100%] h-full "
            src={image}
            alt="Background Image"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-sans flex-col ">
          <h1 className="text-white text-center text-9xl font-bold z-10 p-10 ">
            Advanced Legal Document Analysis Tool
          </h1>
          <h2 className="text-white text-3xl font-bold z-10 ">
            Revolutionizing Legal Workflows with AI-Powered Document Analysis
          </h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f3e57]/90 via-black/20 to-black opacity-100"></div>
      </div>
      <About />
      {components.map((item, index) => (
        <Information
          key={index}
          direction={item.direction}
          image={item.image}
          heading={item.heading}
          description={item.description}
        />
      ))}
      <Pricing />
    </div>
  );
}

export default Homepage;
