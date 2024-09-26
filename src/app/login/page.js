"use client";
import React, { useState } from "react";
import eyeIcon from "../Assets/icons/eye-43.png";
import apple from "../Assets/icons/apple.png";
import fb from "../Assets/icons/fb.png";
import google from "../Assets/icons/google.webp";
import Image from "next/image";

function page() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[30%] flex flex-col items-center justify-center space-y-[30px]">
        <div className="space-y-[15px]">
          <h1 className="text-5xl text-[#1f3e57] text-center">
            {signUp ? "Sign Up" : "Login"} to DOCINSIGHT
          </h1>
          <p className="text-gray-400 text-[20px] text-center">
            Welcome Back! Please enter your details
          </p>
        </div>
        <div className="w-full space-y-[20px]">
          {signUp && (
            <div className="space-y-[15px]">
              <p className="text-[20px] text-[#4f4f4f] font-semibold">
                Full Name
              </p>
              <input
                className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                type="text"
                placeholder="Enter your username or email"
              />
            </div>
          )}
          <div className="space-y-[15px]">
            <p className="text-[20px] text-[#4f4f4f] font-semibold">
              Username or Email
            </p>
            <input
              className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
              type="text"
              placeholder="Enter your username or email"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-[#4f4f4f] font-semibold">Password</p>
            <div className="flex items-center justify-between rounded-lg border border-gray-500 pr-[20px]">
              <input
                className="w-full pl-[20px] py-3 flex-1 outline-none rounded-lg border-none text-[16px]"
                type="password"
                placeholder="Enter your Password"
              />
              <Image src={eyeIcon} alt="" className="h-6 w-6 cursor-pointer" />
            </div>
          </div>
          {signUp && (
            <div className="space-y-2">
              <p className="text-[20px] text-[#4f4f4f] font-semibold">
                Confirm Password
              </p>
              <div className="flex items-center justify-between rounded-lg border border-gray-500 pr-[20px]">
                <input
                  className="w-full pl-[20px] py-3 flex-1 outline-none rounded-lg border-none text-[16px]"
                  type="password"
                  placeholder="Enter your Password"
                />
                <Image
                  src={eyeIcon}
                  alt=""
                  className="h-6 w-6 cursor-pointer"
                />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="" id="" />
              <p className="text-[16px] text-[#4f4f4f]">Remember me</p>
            </div>
            <p className="text-blue-700 text-[16px] font-semibold ml-2 cursor-pointer">
              Forget Password?
            </p>
          </div>
        </div>
        {signUp ? (
          <button className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold">
            Sign Up
          </button>
        ) : (
          <button className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold">
            Sign In
          </button>
        )}
        {signUp ? (
          <p className="text-[16px] text-[#4f4f4f]">
            Already have an account?
            <span
              onClick={() => setSignUp(false)}
              className="text-blue-700 font-semibold ml-2 cursor-pointer"
            >
              login
            </span>
          </p>
        ) : (
          <p className="text-[16px] text-[#4f4f4f]">
            Don't have an account?
            <span
              onClick={() => setSignUp(true)}
              className="text-blue-700 font-semibold ml-2 cursor-pointer"
            >
              Signup
            </span>
          </p>
        )}
        <div className="space-y-[20px]">
          <p className="text-center text-[18px] text-[#4f4f4f]">
            Or Login With
          </p>
          <div className="flex items-center space-x-8">
            <Image
              src={fb}
              alt=""
              className="h-[40px] w-[40px] rounded-lg bg-[#f1f1f1] p-2 cursor-pointer"
            />
            <Image
              src={google}
              alt=""
              className="h-[40px] w-[40px] rounded-lg bg-[#f1f1f1] p-2 cursor-pointer"
            />
            <Image
              src={apple}
              alt=""
              className="h-[40px] w-[40px] rounded-lg bg-[#f1f1f1] p-2 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
