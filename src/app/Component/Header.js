import React from "react";
import Logo from "../Assets/icons/Logo.svg"; // Ensure this path is accurate
function Header() {
  return (
    <div className="flex items-center justify-between px-3 py-6 bg-[#1f3e57]  h-[70px]">
      <Logo className=" w-[200px] h-10" />
      <div>
        <h2 className="text-xl cursor-pointer text-[#F5F5F5]">Login/Signup</h2>
      </div>
    </div>
  );
}

export default Header;
