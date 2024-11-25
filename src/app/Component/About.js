"use client"; // Ensure this runs on the client-side

import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

function About() {
  return (
    <motion.div
      className="flex justify-center items-center text-white bg-black py-10 h-auto md:h-[600px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center w-[90%] md:w-[80%] leading-relaxed">
        <Typewriter
          words={[
            "Empower your legal team with DocInsight, an intuitive platform that simplifies document analysis and management. Enjoy seamless collaboration and enhanced productivity with AI-driven tools that transform complex documents into actionable insights. Say goodbye to tedious manual reviews and embrace a smarter, more efficient workflow!",
          ]}
          loop={1} // No looping
          
          typeSpeed={8} // Quick typing speed
          deleteSpeed={50} // Delete speed (if needed for later edits)
        />
      </p>
    </motion.div>
  );
}

export default About;
