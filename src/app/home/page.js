import React from "react";
import Header from "../Component/Header";
import image from "../Assets/icons/hero.jpg";
import Image from "next/image";
import About from "../Component/About";
import Information from "../Component/Information";
import { components } from "../Component/info";
import PlansComp from "../Component/plansComp";
import ContactUs from "../Component/ContactUs";

function Homepage() {
  return (
    <div className="flex flex-col scroll-smooth">
      <Header className="z-60" />

      {/* Hero Section */}
      <div className="relative">
        <div className="h-screen">
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt="Background Image"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-sans p-5">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-bold z-10 p-5">
            Advanced Legal Document Analysis Tool
          </h1>
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold z-10 p-5">
            Revolutionizing Legal Workflows with AI-Powered Document Analysis
          </h1>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f3e57]/90 via-black/20 to-black opacity-100"></div>
      </div>

      {/* About Section */}
      <About />

      {/* Information Section */}
      {components.map((item, index) => (
        <Information
          key={index}
          direction={item.direction}
          image={item.image}
          heading={item.heading}
          description={item.description}
        />
      ))}

      {/* Plans Section */}
      <PlansComp />

      {/* Contact Us Section */}
      <ContactUs />
    </div>
  );
}

export default Homepage;
