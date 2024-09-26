import React from "react";
import Logo from "../Assets/icons/Logo.svg"
function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#1f3e57]  h-[50px]">
      
        <Logo className=" w-25 h-10 text-yellow-300" />
      
      <div>
        <h2 className="text-xl cursor-pointer text-[#F5F5F5]">Login/Signup</h2>
      </div>
    </div>
  );
}

export default Header;
