'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import pawanImage from "../Assets/profilepics/pawan.png";
import jaspreetImage from "../Assets/profilepics/jaspreet.png";
import jeelImage from "../Assets/profilepics/jeel.png";

// Team data
const teamMembers = [
  {
    name: "Pawandeep Singh Thandi",
    role: "Project Manager/Lead Developer",
    linkedinprofile: "https://www.linkedin.com/in/pawandeep-thandi-2432031ab/",
    email: "thandipawandeep@gmail.com",
    github: "https://github.com/pawandeepthandi",
    image: pawanImage,
  },
  {
    name: "Jaspreet Singh",
    role: "Lead Developer",
    linkedinprofile: "https://www.linkedin.com/in/jaspreet-singh-b63bb518a/",
    email: "jassingh.0244@gmail.com",
    github: "https://github.com/jaspreetsingh0244",
    image: jaspreetImage,
  },
  {
    name: "Jeel Dungarani",
    role: "UI/UX Designer",
    linkedinprofile: "https://www.linkedin.com/in/jeel-dungarani-0621281a1/",
    email: "jeelatwork@gmail.com",
    github: "https://github.com/jeeldungarani",
    image: jeelImage,
  },
  {
    name: "Darshan Bhut",
    role: "Data Analyst",
    linkedinprofile: "https://www.linkedin.com/in/darshan-bhut-53a878272/",
    email: "darshanbhut654@gmail.com",
    github: "https://github.com/darshanbhut",
    image: pawanImage,
  },
  {
    name: "Sakshi Patel",
    role: "Technical Content Developer",
    linkedinprofile: "https://www.linkedin.com/in/sakshi-patel-98628a283/",
    email: "",
    github: "https://github.com/sakshipatel",
    image: pawanImage,
  },
  {
    name: "Mayank Anand",
    role: "Debugger & Tester",
    linkedinprofile: "",
    email: "",
    github: "",
    image: pawanImage,
  },
];

const TeamMembers = () => {
  return (
    <div className="relative bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-[#5e066f]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto py-12 text-center text-white">
        {/* Animated Heading */}
        <motion.h2
          className="text-7xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }} // Starting state
          whileInView={{ opacity: 1, y: 0 }} // Final state
          transition={{ duration: 1, ease: "easeOut" }} // Animation details
          viewport={{ once: true }} // Trigger animation only once
        >
          Meet Our Team
        </motion.h2>

        <p className="mb-12">The experts bringing our vision to life</p>

        {/* Team Members Section */}
        <div className="overflow-x-auto no-scrollbar flex space-x-8 px-4 py-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="flex-none w-72 bg-white shadow-md rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-400"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                className="rounded-full mx-auto mb-4"
                src={member.image}
                alt={`${member.name} Profile`}
                width={120}
                height={100}
              />
              <h3 className="text-xl font-medium text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <div className="flex justify-center space-x-4 mt-4">
                {/* LinkedIn Icon */}
                {member.linkedinprofile && (
                  <Link target="_blank" href={member.linkedinprofile}>
                    <LinkedinOutlined
                      style={{ fontSize: "25px", color: "#0077B5" }}
                    />
                  </Link>
                )}
                {/* Email Icon */}
                {member.email && (
                  <Link href={`mailto:${member.email}`}>
                    <MailOutlined style={{ fontSize: "25px", color: "#C71610" }} />
                  </Link>
                )}
                {/* GitHub Icon */}
                {member.github && (
                  <Link target="_blank" href={member.github}>
                    <GithubOutlined
                      style={{ fontSize: "25px", color: "#111" }}
                    />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
