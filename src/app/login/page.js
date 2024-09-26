import React from "react";
import eyeIcon from "../Assets/icons/coolicon.svg";
import hideIcon from "../Assets/icons/hide.svg";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[30%] flex flex-col items-center justify-center space-y-[30px]">
        <div className="space-y-[15px]">
          <h1 className="text-5xl text-[#1f3e57] text-center">
            Login to DOCINSIGHT
          </h1>
          <p className="text-gray-400 text-[20px] text-center">
            Welcome Back! Please enter your details
          </p>
        </div>
        <div className="w-full space-y-[20px]">
          <div className="space-y-[15px]">
            <p className="text-[20px] text-[#4f4f4f] font-semibold">
              Username or Email
            </p>
            <input
              className="w-full px-[20px] py-3 outline-none rounded-full border border-gray-500"
              type="text"
              placeholder="Enter your username or email"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[20px] text-gray-500 font-semibold">Password</p>
            <div className="flex items-center justify-between rounded-full border border-gray-500">
              <input
                className="w-full px-[20px] py-3 outline-none rounded-full border-none text-[16px]"
                type="password"
                placeholder="Enter your username or email"
              />
              <img src={hideIcon} alt="" className="h-6 w-6 flex-1" />
            </div>
          </div>
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
        <button className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-full text-white font-semibold">
          Sign In
        </button>
        <p className="text-[16px] text-[#4f4f4f]">
          Don't have an account?
          <span className="text-blue-700 font-semibold ml-2 cursor-pointer">
            Sign Up
          </span>
        </p>
        <div className="space-y-[20px]">
          <p className="text-center text-[18px] text-[#4f4f4f]">
            Or Login With
          </p>
          <div className="flex items-center space-x-8">
            <div className="h-[40px] w-[40px] rounded-full bg-gray-600 cursor-pointer"></div>
            <div className="h-[40px] w-[40px] rounded-full bg-gray-600 cursor-pointer"></div>
            <div className="h-[40px] w-[40px] rounded-full bg-gray-600 cursor-pointer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
